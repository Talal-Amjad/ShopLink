import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import OwnerDashboradLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';


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

const ViewAllApplicants = () => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
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

  const handleShowCV = () => {
    console.log('CV Show Clicked');
    
  };

  const handleShowSkills = () => {
    console.log('Skills Show clicked');
  };

  const handleCancel = () => {
    setSelectedMenuIndex(null);
  };

  const actionMenuItems = [
    { label: "Show CV", onClick: handleShowCV },
    { label: "Show Skills", onClick: handleShowSkills },
    { label: "Cancel", onClick: handleCancel },
  ];

  const handleMenuClick = (index) => {
    setSelectedMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const headerData = ['Username', 'Apply Through', 'CV', 'Job ID', 'Job Title', 'Actions'];

  return (
    <OwnerDashboradLayout>
      <Table
        headerData={headerData}
        tableData={applicants.map((applicant, index) => [
          <div className="flex items-center">
            <div>
              <div>{applicant.username}</div>
            </div>
          </div>,
          applicant.applythrough,
          applicant.cv,
          applicant.jobVacancyID,
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
                    item.onClick(); 
                    handleMenuClick(index); 
                  },
                }))}
              />
            )}
          </>,
        ])}
      />
    </OwnerDashboradLayout>
  );
};

export default ViewAllApplicants;
