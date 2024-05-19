import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { jwtDecode } from 'jwt-decode';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import Swal from 'sweetalert2';

function AddSale() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const username = decodedToken.username;

  const [products, setProducts] = useState([{ productName: '', productCategory: '', unitPrice: '', quantity: '' }]);
  const [scannedBarcode, setScannedBarcode] = useState('');


  useEffect(() => {
    let timeoutId;
    const fetchProductDetails = async () => {
      try {
        let barcodeParam;
        // Check if scannedBarcode is numeric or a string
        if (!isNaN(scannedBarcode)) {
          // If numeric, parse it to a number
          barcodeParam = parseInt(scannedBarcode);
        } else {
          // If string, use it directly
          barcodeParam = scannedBarcode;
        }
    
        const response = await axios.get('/product-details', {
          params: {
            barcode: barcodeParam 
          }
        });
    
        const productDetails = response.data;
    
        const updatedProducts = [...products];
        updatedProducts[products.length - 1] = {
          productName: productDetails.productName,
          productCategory: productDetails.category,
          unitPrice: productDetails.unitPrice.toString(),
          quantity: ''
        };
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching product details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Product Not Found',
          text: 'No Product Found.'
        });
      }
    };
    

  
    clearTimeout(timeoutId);

    if (scannedBarcode !== '') {
    
      timeoutId = setTimeout(() => {
        fetchProductDetails();
        setScannedBarcode('');
      }, 500);
    }

    return () => clearTimeout(timeoutId); 
  }, [scannedBarcode, products]);

  const handleProductChange = (e, index, field) => {
    const updatedProducts = [...products];
    if (field === 'barcode') {
      updatedProducts[index][field] = e.target.value;
      setScannedBarcode(e.target.value); // Set scanned barcode for immediate use
    } else {
      updatedProducts[index][field] = e.target.value;
    }
    setProducts(updatedProducts);
  };
  

  const handleAddProduct = () => {
    setProducts([...products, { productName: '', productCategory: '', unitPrice: '', quantity: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    try {
      if (customerName.trim() === '' || customerPhone.trim() === '' || products.length === 0 || products.some(product => product.productName.trim() === '' || product.productCategory.trim() === '' || product.unitPrice.trim() === '' || product.quantity.trim() === '')) {
        throw new Error('All fields are required and at least one product must be added.');
      }

      if (!/^03\d{9}$/.test(customerPhone)) {
        throw new Error('Customer phone number must start with 03 and be 11 digits long.');
      }

      if (products.some(product => parseFloat(product.unitPrice) < 0 || parseInt(product.quantity) < 0)) {
        throw new Error('Price and quantity cannot be negative.');
      }

      for (const product of products) {
        const existingProduct = await axios.get(`/check-stock?productName=${product.productName}&productCategory=${product.productCategory}`);
        if (!existingProduct) {
          throw new Error(`Product "${product.productName}" in category "${product.productCategory}" is not available in stock.`);
        }

        if (existingProduct.data.quantity < product.quantity) {
          throw new Error(`Not enough quantity available for product "${product.productName}" in category "${product.productCategory}".`);
        }
      }

      const payload = {
        customerId: 1,
        customerName,
        customerPhone,
        products,
      };

      const response = await axios.post('/add', payload, {
        params: { username }
      });

      setCustomerName('');
      setCustomerPhone('');
      setProducts([{ productName: '', productCategory: '', unitPrice: '', quantity: '' }]);

      Swal.fire({
        icon: 'success',
        title: 'Sale added successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error adding sale:', error.response ? error.response.data : error.message);

      const errorMessage = error.response ? error.response.data.message : error.message;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    }
  };

  return (
    <ManagerDashboardLayout>
      <div className="bg-white container mx-auto p-10 mt-10 w-1/2">
        <h1 className="text-3xl font-bold mb-4">Add Sale</h1>
        <div className="mb-4">
          <label htmlFor="customerName" className="block">Customer Name:</label>
          <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="customerPhone" className="block">Customer Phone:</label>
          <input type="text" id="customerPhone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
        </div>
        {products.map((product, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md">
            <h3 className="text-lg font-bold mb-2">Product {index + 1}</h3>
            <div className="mb-2">
              <label htmlFor={`barcode${index}`} className="block">Barcode:</label>
              <input
                type="text"
                id={`barcode${index}`}
                value={product.barcode}
                onChange={(e) => handleProductChange(e, index, 'barcode')}
                className="w-full px-3 py-2 border rounded-md"/>

            </div>
            <div className="mb-2">
              <label htmlFor={`productName${index}`} className="block">Product Name:</label>
              <input type="text" id={`productName${index}`} value={product.productName} onChange={(e) => handleProductChange(e, index, 'productName')} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="mb-2">
              <label htmlFor={`productCategory${index}`} className="block">Product Category:</label>
              <input type="text" id={`productCategory${index}`} value={product.productCategory} onChange={(e) => handleProductChange(e, index, 'productCategory')} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="mb-2">
              <label htmlFor={`unitPrice${index}`} className="block">Unit Price:</label>
              <input type="text" id={`unitPrice${index}`} value={product.unitPrice} onChange={(e) => handleProductChange(e, index, 'unitPrice')} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="mb-2">
              <label htmlFor={`quantity${index}`} className="block">Quantity:</label>
              <input type="text" id={`quantity${index}`} value={product.quantity} onChange={(e) => handleProductChange(e, index, 'quantity')} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <button onClick={() => handleRemoveProduct(index)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Remove Product</button>
          </div>
        ))}
        <button onClick={handleAddProduct} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-4">Add Product</button>
        <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Add Sale</button>
      </div>
    </ManagerDashboardLayout>
  );
}

export default AddSale;
