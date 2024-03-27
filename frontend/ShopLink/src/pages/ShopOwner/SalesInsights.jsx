import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios'; // Corrected import path
import Table from '../../components/Table/Table';
import OwnerDashboardLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import name
import Button from '../../components/Buttons/Button';
import NoDataFound from '../NoDataFound';

const SalesInsights = () => {
  const navigate = useNavigate();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [allsales, setAllsales] = useState([]);
  const [branches, setBranches] = useState([]); // Define and initialize branches state variable
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // Corrected function call
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
    axios.get('/getsalesforallbranches', { params: { branchId: selectedBranch } })
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setAllsales(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      });
  },[selectedBranch]); // Added selectedBranch to dependency array
  
  const handleMostDemadingProduct = () => {
    // Calculate the most demanding product
    const productCountMap = {};
    allsales.forEach(sale => {
      const key = `${sale.productName}#${sale.productCategory}`;
      productCountMap[key] = (productCountMap[key] || 0) + sale.quantity;
    });

    // Find the product with the highest sales count
    let mostDemandingProduct = null;
    let highestQuantity = 0;
    for (const key in productCountMap) {
      if (productCountMap[key] > highestQuantity) {
        highestQuantity = productCountMap[key];
        mostDemandingProduct = key;
      }
    }

    // Extract productName and productCategory from mostDemandingProduct
    const [productName, productCategory] = mostDemandingProduct.split('#');

    // Show the most demanding product in Swal
    Swal.fire({
      title: "Most Demanding Product",
      html: `
        <p><strong>Product Name:</strong> ${productName}</p>
        <p><strong>Product Category:</strong> ${productCategory}</p>
        <p><strong>Sold Quantity:</strong> ${highestQuantity}</p>
      `,
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  // Function to format date to a standard format without time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const headerData = ['Product Name', 'Category',  'Customer Name', 'Customer Phone', 'Sales Date','Quantity' ,'Total Price'];

  return (
    <OwnerDashboardLayout>
      <div className="flex justify-between items-center my-2 mt-8">
        <p className="font-semibold text-2xl dark:text-gray-400">Sales</p>
        <div className="flex items-center">
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
        </div>
        <div>
          <Button text="Most Demanding Product" type="button" roundedFull={true} onClick={handleMostDemadingProduct} />
        </div>
      </div>
      {allsales.length > 0 ? (
        <Table
          headerData={headerData}
          tableData={allsales.map((sale, index) => [          
            <div className="flex items-center">
              <div>
                <div>{sale.productName}</div>
              </div>
            </div>,
            sale.productCategory,
            sale.customerName,
            sale.customerPhone,
            formatDate(sale.salesDate),
            sale.quantity,
            sale.totalPrice,
          ])}
        />
      ) : (
        <NoDataFound />
      )}
    </OwnerDashboardLayout>
  );
};
  
export default SalesInsights;
