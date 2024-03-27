import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import { jwtDecode } from 'jwt-decode';
import NoDataFound from '../NoDataFound'; // Import the NoDataFound component

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const username = decodedToken.username;

  useEffect(() => {
    axios.get('/employee', {
      params: { username }
    })
    .then(response => {
      console.log('Data fetched successfully:', response.data);
      setEmployees(response.data);
      setLoading(false); // Update loading state when data is fetched
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false); // Update loading state even if there's an error
      // Handle error as needed
    });
  }, []); 

  const headerData = ['First Name','Last Name', 'Email', 'Designation'];

  return (
    <ManagerDashboardLayout>
      <div className="flex justify-between items-center my-2 mt-8">
        <p className="font-semibold text-2xl dark:text-gray-400">Employees</p>
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
            employee.designation
          ])}
        />
      )}
    </ManagerDashboardLayout>
  );
};

export default Employee;
