import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import OwnerDashboardLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NoDataFound from '../NoDataFound'; 



const StockforAllBranches = () => {
  const navigate = useNavigate();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [allStocks, setAllStocks] = useState([]);
  const [branches, setBranches] = useState([]); 
  const [selectedStatus, setSelectedStatus] = useState('');

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  const username = decodedToken.username;
 
 
 
  const [selectedBranch, setSelectedBranch] = useState('');
  useEffect(() => {
    axios.get('/allbranchesids')
      .then(response => setBranches(response.data))
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };


  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get('/stockforallbranches', {
      params: {status: selectedStatus, branchId:selectedBranch }
    })
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setAllStocks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      });
  }, [selectedStatus,selectedBranch]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
 

  // Function to format date to a standard format without time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const headerData = ['Product Name', 'Category', 'Dosage','Quantity' ,'Unit Price', 'Brand Name', 'Expiry Date'];

  return (
    <OwnerDashboardLayout>
      <div className="flex justify-between items-center my-2 mt-8">
        <p className="font-semibold text-2xl dark:text-gray-400">
          {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}{selectedStatus === 'reject' ? 'ed' : selectedStatus === 'approve' ? 'd' : ''} Medicines
        </p>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border-gray-300 border p-2 rounded-l-md focus:outline-none focus:border-primary dark:bg-gray-900 dark:text-gray-400"
        >
          <option value="" disabled>Select Status</option>
          <option value="All">All</option>
          <option value="valid">Valid</option>
          <option value="expired">Expired</option>
        </select>
        <h3 className='text-xl font-semibold m-3'>Branch Code : </h3>
          <select
            value={selectedBranch}
            onChange={handleBranchChange}
            className="border-gray-300 border p-2 rounded-l-md focus:outline-none focus:border-primary dark:bg-gray-900 dark:text-gray-400"
          >
            <option value="">Select Branch</option>
            <option value="All">All</option>
            {branches.map(branch => (
              <option key={branch.branchId} value={branch.branchId}>{branch.branchId}</option>
            ))}
          </select>
        <div>
         
        </div>
      </div>
      {allStocks.length === 0 ? ( // Conditionally render NoDataFound if allStocks array is empty
        <NoDataFound />
      ) : (
        <Table
          headerData={headerData}
          tableData={allStocks.map((stock, index) => ([
            <div className="flex items-center">
              <div>
                <div>{stock.productName}</div>
              </div>
            </div>,
            stock.category,
            stock.dosage,
            stock.quantity,
            stock.unitPrice,
            stock.brandName,
            formatDate(stock.expiryDate), // Format expiry date
            <span className={`p-2 inline-flex text-l leading-5 rounded-full ${stock.status === 'valid' ? 'bg-green-100 text-green-800' : stock.status === 'expired' ? 'bg-red-100 text-red-800' : ''}`}>
              {stock.status}
            </span>,
          ]))}
        />
      )}
    </OwnerDashboardLayout>
  );
};

export default StockforAllBranches;
