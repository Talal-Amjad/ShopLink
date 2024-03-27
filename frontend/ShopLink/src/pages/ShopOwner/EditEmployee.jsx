import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import Swal from 'sweetalert2';
import Modal from '../../components/Modal/Modal';

const EditEmployee = ({ onClose, isOpen, employeeID }) => {
    const [employeeData, setEmployeeData] = useState(null);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');

    useEffect(() => {
        axios.get('/allbranchesids')
            .then(response => {
                setBranches(response.data);
                if (employeeData && employeeData.branchId) {
                    setSelectedBranch(employeeData.branchId);
                }
            })
            .catch(error => console.error('Error fetching branches:', error));
    }, [employeeData]);

    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
    };

    useEffect(() => {
        if (isOpen && employeeID) {
            axios.get(`/getemployee/${employeeID}`)
                .then(response => {
                    setEmployeeData(response.data);
                    if (response.data && response.data.branchId) {
                        setSelectedBranch(response.data.branchId);
                    }
                })
                .catch(error => {
                    console.error('Error fetching employee data:', error);
                });
        }
    }, [isOpen, employeeID]);

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'First Name can only contain alphabets and spaces')
            .required('First Name is required'),
        lastname: Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'Last Name can only contain alphabets and spaces')
            .required('Last Name is required'),
        username: Yup.string().required('Username is required'),
        designation: Yup.string().required('Designation is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        branchId: Yup.string().required('Branch ID is required')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const updatedValues = { ...values, branchId: selectedBranch };
    
            const confirmResult = await Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: 'Do you want to update this employee?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            });
    
            if (confirmResult.isConfirmed) {
                const response = await axios.put(`/updateemployee/${employeeID}`, updatedValues);
                Swal.fire({
                    icon: 'success',
                    title: 'Employee Updated Successfully',
                    text: 'The employee details have been updated successfully.',
                    confirmButtonColor: '#4682B4'
                });
                onClose();
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            setSubmitting(false);
        }
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {employeeData && (
                <Formik
                    initialValues={employeeData}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="firstname" className="text-sm font-medium text-gray-900 block mb-2">First Name</label>
                                    <Field type="text" name="firstname" id="firstname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="John" />
                                    <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="lastname" className="text-sm font-medium text-gray-900 block mb-2">Last Name</label>
                                    <Field type="text" name="lastname" id="lastname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Doe" />
                                    <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2">Username</label>
                                    <Field type="text" name="username" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="johndoe" />
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="designation" className="text-sm font-medium text-gray-900 block mb-2">Designation</label>
                                    <Field type="text" name="designation" id="designation" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Manager" />
                                    <ErrorMessage name="designation" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                                    <Field type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="john@example.com" />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="branchId" className="text-sm font-medium text-gray-900 block mb-2">Branch Code</label>
                                    <select
                                        value={selectedBranch}
                                        onChange={handleBranchChange}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="All">All</option>
                                        {branches.map(branch => (
                                            <option  key={branch.branchId} value={branch.branchId}>{branch.branchId}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button className="text-white bg-primary hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save</button>
                            </Form>
                        )}
                    </Formik>
                )}
            </Modal>
        );
    };
    
    export default EditEmployee;
    