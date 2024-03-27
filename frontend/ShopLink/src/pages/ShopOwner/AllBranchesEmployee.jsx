import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import OwnerDashboardLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';
import NoDataFound from '../NoDataFound';
import Swal from 'sweetalert2';
import useModal from "../../hooks/useModal";
import EditEmployee from './EditEmployee';

const AllBranchesEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedEmployeeID, setSelectedEmployeeID] = useState(null); // State to store selected employee ID
    const [isOpen, toggleModal] = useModal();

    useEffect(() => {
        axios.get('/allbranchesids')
            .then(response => setBranches(response.data))
            .catch(error => console.error('Error fetching branches:', error));
    }, []);

    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
    };

    const fetchEmployees = () => {
        axios.get('/allemployee', { params: { branchId: selectedBranch } })
            .then(response => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEmployees(selectedBranch);
    }, [selectedBranch]);

    const handleEditClick = (employeeID) => {
        setSelectedEmployeeID(employeeID); // Set the selected employee ID
        toggleModal(); // Open the modal
    };

    const handleRemoveEmployee = (employeeID) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this employee?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/deleteemployee/${employeeID}`)
                    .then(response => {
                        Swal.fire('Deleted!', response.data.message, 'success');
                        fetchEmployees(selectedBranch);
                    })
                    .catch(error => {
                        console.error('Error deleting employee:', error);
                        Swal.fire('Error!', 'Failed to delete employee.', 'error');
                    });
            }
        });
    };

    const headerData = ['First Name', 'Last Name', 'Email', 'Designation', 'Branch', 'Action'];

    return (
        <OwnerDashboardLayout>
            <div className="flex justify-between items-center my-2 mt-8">
                <p className="font-semibold text-2xl dark:text-gray-400">Employees</p>
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
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : employees.length === 0 ? (
                <NoDataFound />
            ) : (
                <Table
                    headerData={headerData}
                    tableData={employees.map((employee, index) => [
                        <div className="flex items-center">
                            <div>
                                <div>{employee.firstname}</div>
                            </div>
                        </div>,
                        employee.lastname,
                        employee.email,
                        employee.designation,
                        employee.branchId,
                        <>
                            <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" onClick={() => handleEditClick(employee.employeeID)}>Edit</button>
                            <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" onClick={() => handleRemoveEmployee(employee.employeeID)}>Remove</button>
                        </>
                    ])}
                />
            )}
            {isOpen && <EditEmployee isOpen={isOpen} onClose={toggleModal} employeeID={selectedEmployeeID} />}
        </OwnerDashboardLayout>
    );
};

export default AllBranchesEmployee;
