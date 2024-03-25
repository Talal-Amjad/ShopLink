import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

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

const Employee = () => {
  const navigate = useNavigate();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [currentCV, setCurrentCV] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  const username = decodedToken.username;
  console.log("userame is  ",username);

  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get('/employee', {
      params: { username, role,status:selectedStatus }
  })
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setApplicants(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      });
  });

 

  

 
  

  
  
  

  const headerData = ['Username', 'Experience', 'Job ID', 'Job Title', 'Actions'];

  return (
    <ManagerDashboardLayout>
       <div className="flex justify-between items-center my-2 mt-8">
        <p className="font-semibold text-2xl dark:text-gray-400">
          Employees
        </p>
         
        </div>
      <Table
        headerData={headerData}
        tableData={applicants.map((applicant, index) => [
          <div className="flex items-center">
            <div>
              <div>{applicant.username}</div>
            </div>
          </div>,
        
          applicant.jobTitle,
          <>
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => handleMenuClick(index)}
            >
              <FiMoreVertical />
            </div>
            {selectedMenuIndex === index && (
              <Actions
                menuItems={actionMenuItems.map((item) => ({
                  ...item,
                  onClick: () => {
                    item.onClick(applicant.username);
                    handleMenuClick(index);
                  },
                }))}
              />
            )}
          </>,
        ])}
      />
      <button
        className="bottom-4 right-4 px-4 py-2 bg-primary text-white rounded m-10"
        onClick={handleViewSkillReport}
       
      >
        View Applicant's Skill Report
      </button>
    </ManagerDashboardLayout>
  );
};

export default Employee;
