import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

export default function AddProduct() {
    const [productBarcode, setProductBarcode] = useState('');
    const [barcodeScanned, setBarcodeScanned] = useState(false);

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required'),
        category: Yup.string().required('Category is required'),
        dosage: Yup.number().min(1, 'Dosage must be greater than 0').required('Dosage is required'),
        price: Yup.number().min(1, 'Price must be greater than 0').required('Price is required'),
        brandName: Yup.string().required('Brand Name is required'),
        quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be greater than 0'),
        manufactureDate: Yup.date()
            .max(new Date(), 'Manufactured Date cannot be in the future')
            .required('Manufactured Date is required'),
        expiryDate: Yup.date()
            .min(new Date(new Date().setDate(new Date().getDate() + 10)), 'Expiry Date must be at least 10 days in the future')
            .required('Expiry Date is required'),
        description: Yup.string(),
        barcode: Yup.string()
    });
    
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;

    const initialValues = {
        productName: '',
        category: '',
        dosage: '',
        price: '',
        brandName: '',
        quantity: '',
        manufactureDate: '',
        expiryDate: '',
        description: '',
        barcode:'',
    };

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = { ...values, barcode: productBarcode };
            const response = await axios.post('/addproducts', formData, {
                params: { username }
            });
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Product Added Successfully',
                text: 'The product has been added successfully.',
                confirmButtonColor: '#4682B4'
            });
            resetForm();
            setProductBarcode('');
            setBarcodeScanned(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Product',
                text: 'There was an error while adding the product. Please try again later.',
                confirmButtonColor: '#4682B4'
            });
            setSubmitting(false); // Ensure the form is not stuck in a submitting state
        }
    };

    useEffect(() => {
        const handleBarcodeScan = (e) => {
            setProductBarcode(e.data);
            setBarcodeScanned(true);
        };

        // Add event listener for barcode scan
        window.addEventListener('barcodeScanned', handleBarcodeScan);

        return () => {
            // Cleanup the event listener when component unmounts
            window.removeEventListener('barcodeScanned', handleBarcodeScan);
        };
    }, []);

    return (
        <ManagerDashboardLayout>
            <div className="bg-white border-4 rounded-lg shadow relative m-10">
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">Add product</h3>
                </div>
                <div className="p-6 space-y-6">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="productName" className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                                        <Field type="text" name="productName" id="productName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Product Name" />
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
                                        <Field type="number" name="dosage" id="dosage" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Dosage" />
                                        <ErrorMessage name="dosage" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Price</label>
                                        <Field type="number" name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Price" />
                                        <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="brandName" className="text-sm font-medium text-gray-900 block mb-2">Brand Name</label>
                                        <Field type="text" name="brandName" id="brandName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Brand Name" />
                                        <ErrorMessage name="brandName" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="quantity" className="text-sm font-medium text-gray-900 block mb-2">Quantity</label>
                                        <Field type="number" name="quantity" id="quantity" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Quantity" />
                                        <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="manufactureDate" className="text-sm font-medium text-gray-900 block mb-2">Manufactured Date</label>
                                        <Field type="date" name="manufactureDate" id="manufactureDate" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                        <ErrorMessage name="manufactureDate" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="expiryDate" className="text-sm font-medium text-gray-900 block mb-2">Expiry Date</label>
                                        <Field type="date" name="expiryDate" id="expiryDate" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                                        <ErrorMessage name="expiryDate" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Description</label>
                                        <Field as="textarea" name="description" id="description" rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Description" />
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="barcode" className="text-sm font-medium text-gray-900 block mb-2">Barcode</label>
                                        <Field type="text" name="barcode" id="barcode" className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${barcodeScanned ? 'bg-gray-200' : ''}`} value={productBarcode} onChange={(e) => setProductBarcode(e.target.value)} readOnly={barcodeScanned} />
                                    </div>
                                </div>
                                <button className="text-white bg-primary hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6" type="submit">Save all</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </ManagerDashboardLayout>
    );
}
