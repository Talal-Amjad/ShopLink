import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Button from '../../components/Buttons/Button';
import NoDataFound from '../NoDataFound'; 
import useModal from "../../hooks/useModal";
import EditProduct from './EditProduct';


const AllStocks = () => {
  const navigate = useNavigate();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [allStocks, setAllStocks] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  const username = decodedToken.username;
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isOpen, toggleModal] = useModal();
  const [selectedProID, setSelectedProID] = useState(null); 


  useEffect(() => {
    axios.get('/allstock', {
      params: { username, status: selectedStatus }
    })
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setAllStocks(response.data);
        response.data.forEach(stock => {
          if (stock.quantity < 10) {
            Swal.fire({
              title: "Low Stock Alert",
              html: `Product Name: ${stock.productName}<br/>Branch ID: ${stock.branchId}<br/>Quantity: ${stock.quantity}`,
              icon: "warning",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            });
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [selectedStatus]);


 

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleEditClick = (proID) => {
    setSelectedProID(proID); // Set the selected product ID
    toggleModal(); // Open the modal
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/deleteproduct/${productId}`)
          .then(response => {
            console.log('Product deleted successfully:', response.data);
            // Handle any UI updates or notifications
          })
          .catch(error => {
            console.error('Error deleting product:', error);
            // Handle error as needed
          });
      }
    });
  };


  const handleAddProduct = () => {
    navigate('/addproduct');
  }

  // Function to format date to a standard format without time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const headerData = ['Product Name', 'Category', 'Dosage','Quantity' ,'Unit Price', 'Brand Name', 'Expiry Date', 'Status', 'Actions'];

  return (
    <ManagerDashboardLayout>
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
        <div>
          <Button text="+ Add Product" type="button" roundedFull={true} onClick={handleAddProduct} />
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
            <div>
            <button className="ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" onClick={() => handleEditClick(stock.proID)}>Edit</button>
            <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" 
              onClick={() => handleDelete(stock.proID)}>Delete</button>
            </div>
          ]))}
        />
      )}
       
      {isOpen && <EditProduct isOpen={isOpen} onClose={toggleModal} proID={selectedProID}  />}
    </ManagerDashboardLayout>
  );
};

export default AllStocks;
