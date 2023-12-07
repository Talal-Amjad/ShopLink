import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import ManagerDashboradLayout from '../../components/layouts/BranchManager/managerDashboardLayout';

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

export default function ViewAllApplicants() {
  const [showMenuArray, setShowMenuArray] = useState([]);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get('/applicants')
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setApplicants(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      });
  }, []);
  
  const handleSelect = () => {
    // Implement handleSelect functionality
  };

  const handleReject = () => {
    // Implement handleReject functionality
  };

  const handleCancel = () => {
    setShowMenuArray(Array(applicants.length).fill(false));
  };

  const actionMenuItems = [
    { label: "select", onClick: handleSelect },
    { label: "reject", onClick: handleReject },
    { label: "Cancel", onClick: handleCancel },
  ];

  const handleMenuClick = (index) => {
    const updatedShowMenuArray = showMenuArray.map((value, idx) =>
      idx === index ? !value : false
    );
    setShowMenuArray(updatedShowMenuArray);
  };

  const headerData = ['Username', 'Apply Through', 'CV', 'Job ID', 'Job Title', 'Actions'];

  return (
    <ManagerDashboradLayout>
      <Table
        headerData={headerData}
        tableData={applicants.map((applicants, index) => [
          <div className="flex items-center">
            <div>
              <div>{applicants.username}</div>
            </div>
          </div>,
          applicants.applythrough,
          applicants.cv,
          applicants.jobVacancyID,
          applicants.jobTitle,
          <>
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => handleMenuClick(index)}
            >
              <FiMoreVertical />
            </div>
            {showMenuArray[index] && <Actions menuItems={actionMenuItems} />}
          </>,
        ])}
      />
    </ManagerDashboradLayout>
  );
}
