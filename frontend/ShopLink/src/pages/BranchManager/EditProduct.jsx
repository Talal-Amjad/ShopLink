import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import Swal from 'sweetalert2';
import Modal from '../../components/Modal/Modal';

const EditProduct = ({ onClose, isOpen, proID }) => {
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        if (isOpen && proID) {
            // Fetch product data based on proID
            axios.get(`/getProductById/${proID}`)
                .then(response => {
                    // Convert manufactureDate and expiryDate to Date objects
                    const formattedProductData = {
                        ...response.data,
                        manufactureDate: formatDate(response.data.manufactureDate), // Format date
                        expiryDate: formatDate(response.data.expiryDate), // Format date
                        unitPrice: response.data.unitPrice // Assign unitPrice value to price
                    };
                    setProductData(formattedProductData);
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                    
                });
        }
    }, [isOpen, proID]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required'),
        category: Yup.string().required('Category is required'),
        dosage: Yup.number().min(1, 'Dosage must be greater than 0').required('Dosage is required'),
        unitPrice: Yup.number().min(1, 'unitPrice must be greater than 0').required('unitPrice is required'),
        brandName: Yup.string().required('Brand Name is required'),
        quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be greater than 0'),
        manufactureDate: Yup.date()
            .max(new Date(), 'Manufactured Date cannot be in the future')
            .required('Manufactured Date is required'),
        expiryDate: Yup.date()
            .min(new Date(new Date().setDate(new Date().getDate() + 10)), 'Expiry Date must be at least 10 days in the future')
            .required('Expiry Date is required'),
        description: Yup.string()
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.put(`/updateProduct/${proID}`, values);
            console.log(response.data);
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Product Updated Successfully',
                text: 'The product has been updated successfully.',
                confirmButtonColor: '#4682B4'
            });
            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {productData && (
                <Formik
                    initialValues={productData}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <h1  className='text-3xl font-medium p-2 text-center'> Edit Product</h1>
                            <div className="grid grid-cols-6 gap-6 p-2">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="productName" className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                                    <Field type="text" name="productName" id="productName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple Imac 27”" />
                                    <ErrorMessage name="productName" component="div" className="text-red-500 text-sm" />
                                </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                                        <Field as="select" name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                                            <option value="">Select a category</option>
                                            <option value="Tablet">Tablet</option>
                                            <option value="Capsule">Capsule</option>
                                            <option value="Injection">Injection</option>
                                            <option value="Sachet">Sachet</option>
                                            <option value="Syrup">Syrup</option>
                                        </Field>
                                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="dosage" className="text-sm font-medium text-gray-900 block mb-2">Dosage</label>
                                        <Field type="number" name="dosage" id="dosage" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="10 ml"/>
                                        <ErrorMessage name="dosage" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="unitPrice" className="text-sm font-medium text-gray-900 block mb-2">Unit Price</label>
                                        <Field type="number" name="unitPrice" id="unitPrice" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="2300"/>
                                        <ErrorMessage name="unitPrice" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="brandName" className="text-sm font-medium text-gray-900 block mb-2">Brand Name</label>
                                        <Field type="text" name="brandName" id="brandName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="e.g. Pfizer"/>
                                        <ErrorMessage name="brandName" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="quantity" className="text-sm font-medium text-gray-900 block mb-2">Quantity</label>
                                        <Field type="number" name="quantity" id="quantity" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Quantity" />
                                        <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="manufactureDate" className="text-sm font-medium text-gray-900 block mb-2">Manufactured Date</label>
                                        <Field type="date" name="manufactureDate" id="manufactureDate" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"/>
                                        <ErrorMessage name="manufactureDate" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="expiryDate" className="text-sm font-medium text-gray-900 block mb-2">Expiry Date</label>
                                        <Field type="date" name="expiryDate" id="expiryDate" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"/>
                                        <ErrorMessage name="expiryDate" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Description</label>
                                        <Field as="textarea" name="description" id="description" rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Description"/>
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                    </div>
                                </div>
                                <button className="text-white bg-primary mt-4 ml-2 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save all</button>
                                </Form>
                )}
            </Formik>
        )}
    </Modal>

 )};

 export default EditProduct;
