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

  const handleDelete = (saleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this sale?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/deletesale/${saleId}`)
          .then(response => {
            console.log('Sale deleted successfully:', response.data);
            // Handle any UI updates or notifications
            setAllsales(prevSales => prevSales.filter(sale => sale.saleId !== saleId));
            Swal.fire("Deleted!", "The sale has been deleted successfully.", "success");
          })
          .catch(error => {
            console.error('Error deleting sale:', error);
            Swal.fire("Error!", "An error occurred while deleting the sale.", "error");
          });
      }
    });
  };
  
  

  

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
          <div>
          <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" 
            onClick={() => handleDelete(sale.saleId)}>Delete</button>
          </div>
        ])}
      />
    </ManagerDashboardLayout>
  );
};

export default SalesInsights;

