//jsx:
import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios'; // Corrected import path
import Table from '../../components/Table/Table';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import name
import Button from '../../components/Buttons/Button';

const Actions = ({ menuItems }) => {
  return (
    <div className="absolute w-[126px] bg-white rounded text-sm right-0 mt-2 max-w-xs transition-all duration-[400ms] dark:bg-gray-900 dark:text-gray-400">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="block w-full p-1 hover:bg-primary hover:text-white"
          onClick={item.onClick}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

const SalesInsights = () => {
  const navigate = useNavigate();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [allsales, setAllsales] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // Corrected function call
  const username = decodedToken.username;

  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get('/branchsales', {
        params: { username }
    })
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setAllsales(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      });
  },[username]); // Added username to dependency array

  const handleMenuClick = (index) => {
    setSelectedMenuIndex(index);
  };

  const handleDelete = (saleId) => {
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
        axios.delete(`/deletesale/${saleId}`)
          .then(response => {
            console.log('Product deleted successfully:', response.data);
            // Handle any UI updates or notifications
            window.location.reload();
          })
          .catch(error => {
            console.error('Error deleting product:', error);
            // Handle error as needed
          });
      }
    });
  };

  const handleCancel = () => {
    setSelectedMenuIndex(null); // Toggle off the menu
  };

  const actionMenuItems = [
    { label: "Delete", onClick: handleDelete },
    { label: "Update"},
    { label: "Cancel"},
  ];

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

  const headerData = ['Product Name', 'Category',  'Customer Name', 'Customer Phone', 'Sales Date','Quantity' ,'Total Price','Action'];

  return (
    <ManagerDashboardLayout>
      <div className="flex justify-between items-center my-2 mt-8">
        <p className="font-semibold text-2xl dark:text-gray-400">Branches</p>
        <div>
          <Button text="Most Demanding Product" type="button" roundedFull={true} onClick={handleMostDemadingProduct} />
        </div>
      </div>
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
          <div className="flex justify-center cursor-pointer" onClick={() => handleMenuClick(index)}>
            <FiMoreVertical />
          </div>,
          selectedMenuIndex === index && (
            <Actions
              key={index}
              menuItems={actionMenuItems.map((item) => ({
                ...item,
                onClick: () => item.onClick(sale.saleId), // Corrected property name
              }))}
            />
          ),
        ])}
      />
    </ManagerDashboardLayout>
  );
};

export default SalesInsights;

