import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import axios from '../../axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

export default function AddSale() {
  const [additionalProducts, setAdditionalProducts] = useState([]);

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer Name is required'),
    customerPhone: Yup.string().required('Customer Phone is required'),
  });

  const token = localStorage.getItem('token');
  const username = jwtDecode(token).username;

  const handleMainSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Submit Clicked');
    try {
      const { customerName, customerPhone } = values;
  
      // Check stock availability before submission
      const insufficientStockProducts = await checkStockAvailability();
      if (insufficientStockProducts.length > 0) {
        showStockAlert(insufficientStockProducts);
        return;
      }
  
      // Send data to backend for each product
      await Promise.all(additionalProducts.map(async (product) => {
        await axios.post('/addsale', { ...product, customerName, customerPhone }, {
          params: { username }
        });
      }));
  
      // Reset form and additional products after successful submission
      resetForm();
      setAdditionalProducts([]);
  
      // Show success message
      Swal.fire('Success', 'Sale added successfully', 'success');
    } catch (error) {
      console.error('Error adding sale: ', error);
      // Show error message
      Swal.fire('Error', 'Error adding sale', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const checkStockAvailability = async () => {
    const insufficientStockProducts = [];
    for (const product of additionalProducts) {
      const response = await axios.get('/checkstock', {
        params: {
          productName: product.productName,
          productCategory: product.productCategory,
          quantity: product.quantity,
        },
      });
      if (!response.data.available) {
        insufficientStockProducts.push(product);
      }
    }
    return insufficientStockProducts;
  };

  const showStockAlert = (products) => {
    let message = 'The following products are out of stock or have insufficient quantity:\n';
    for (const product of products) {
      message += `${product.productName} (${product.productCategory})\n`;
    }
    Swal.fire('Stock Error', message, 'error');
  };

  const handleAddProduct = () => {
    setAdditionalProducts([...additionalProducts, initialValues]);
  };

  const removeProduct = (index) => {
    const updatedProducts = additionalProducts.filter((_, i) => i !== index);
    setAdditionalProducts(updatedProducts);
  };

  const initialValues = {
    productName: '',
    productCategory: '',
    unitPrice: '',
    quantity: '',
  };

  return (
    <ManagerDashboardLayout>
      <div className="bg-white border-4 rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Add Sale</h3>
        </div>
        <div className="p-6 space-y-6">
          <Formik
            initialValues={{ customerName: '', customerPhone: '' }}
            validationSchema={validationSchema}
            onSubmit={handleMainSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="customerName" className="text-sm font-medium text-gray-900 block mb-2">Customer Name</label>
                    <Field type="text" name="customerName" id="customerName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Customer Name" />
                    <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="customerPhone" className="text-sm font-medium text-gray-900 block mb-2">Customer Phone</label>
                    <Field type="text" name="customerPhone" id="customerPhone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Customer Phone" />
                    <ErrorMessage name="customerPhone" component="div" className="text-red-500 text-sm" />
                  </div>
                  {/* Main set of fields */}
                  {additionalProducts.map((product, index) => (
                    <React.Fragment key={index}>
                      <div className="col-span-6">
                        <button type="button" onClick={() => removeProduct(index)} className="text-red-500 absolute text-3xl right-0 mr-6 mt-2 mb-4">✕</button>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor={`productName_${index}`} className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                        <Field type="text" name={`productName_${index}`} id={`productName_${index}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Product Name" />
                        <ErrorMessage name={`productName_${index}`} component="div" className="text-red-500 text-sm" />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor={`productCategory_${index}`} className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                        <Field as="select" name={`productCategory_${index}`} id={`productCategory_${index}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                          <option value="">Select a category</option>
                          <option value="tablet">Tablet</option>
                          <option value="capsule">Capsule</option>
                          <option value="sachet">Sachet</option>
                          <option value="injection">Injection</option>
                        </Field>
                        <ErrorMessage  name={`productCategory_${index}`} component="div" className="text-red-500 text-sm"/>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor={`unitPrice_${index}`} className="text-sm font-medium text-gray-900 block mb-2">Unit Price </label>
                        <Field type="number" name={`unitPrice_${index}`} id={`unitPrice_${index}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Unit Price" />
                        <ErrorMessage name={`unitPrice_${index}`} component="div" className="text-red-500 text-sm" />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor={`quantity_${index}`} className="text-sm font-medium text-gray-900 block mb-2">Quantity</label>
                        <Field type="number" name={`quantity_${index}`} id={`quantity_${index}`} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Quantity" />
                        <ErrorMessage name={`quantity_${index}`} component="div" className="text-red-500 text-sm" />
                      </div>
                    </React.Fragment>
                  ))}
                  {/* End of main fields */}
                </div>
                <div className="p-6 border-t border-gray-200 rounded-b flex justify-between items-center">
                  <button
                    className="text-white bg-primary hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save all'}
                  </button>
                  <button className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={handleAddProduct}>Add Product</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}
