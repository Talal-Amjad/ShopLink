import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Button from '../../components/Buttons/Button';

const Actions = ({ menuItems, onCancel }) => {
  const handleMenuItemClick = (item) => {
    item.onClick(); // Execute the onClick function of the selected menu item
    if (item.label === "Cancel") {
      onCancel(); // Close the menu if the clicked item is 'Cancel'
    }
  };

  return (
    <div className="absolute w-[126px] bg-white rounded text-sm right-0 mt-2 max-w-xs transition-all duration-[400ms] dark:bg-gray-900 dark:text-gray-400">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="block w-full p-1 hover:bg-primary hover:text-white"
          onClick={() => handleMenuItemClick(item)} // Call handleMenuItemClick with the clicked item
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

const AllStocks = () => {
  const navigate = useNavigate();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [allStocks, setAllStocks] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  const username = decodedToken.username;
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get('/allstock', {
      params: { username, status: selectedStatus }
    })
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setAllStocks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      });
  }, [selectedStatus]);

  const handleMenuClick = (index) => {
    setSelectedMenuIndex(index);
  };

  const handleCancel = () => {
    setSelectedMenuIndex(null); // Toggle off the menu
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
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

  const actionMenuItems = [
    { label: "Delete", onClick: handleDelete },
    { label: "Update" },
    { label: "Cancel" },
  ];

  const handleAddProduct = () => {
    navigate('/addproduct');
  }

  // Function to format date to a standard format without time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const headerData = ['Product Name', 'Category', 'Dosage', 'Unit Price', 'Brand Name', 'Manufacture Date', 'Expiry Date', 'Status', 'Actions'];

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
          stock.unitPrice,
          stock.brandName,
          formatDate(stock.manufactureDate), // Format manufacture date
          formatDate(stock.expiryDate), // Format expiry date
          <span className={`p-2 inline-flex text-l leading-5 rounded-full ${stock.status === 'valid' ? 'bg-green-100 text-green-800' : stock.status === 'expired' ? 'bg-red-100 text-red-800' : ''}`}>
            {stock.status}
          </span>,
          <>
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => handleMenuClick(index)}
            >
              <FiMoreVertical />
            </div>
            {selectedMenuIndex === index && (
              <Actions
                key={index}
                menuItems={actionMenuItems}
                onCancel={handleCancel} // Pass onCancel function to Actions component
              />
            )}
          </>
        ]))}
      />
    </ManagerDashboardLayout>
  );
};

export default AllStocks;
