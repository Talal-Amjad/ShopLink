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
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');


  useEffect(() => {
    axios.get('/allbranchesids')
      .then(response => setBranches(response.data))
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  useEffect(() => {
    fetchApplicants();
  }, [selectedBranch, selectedStatus]);
  



  const fetchApplicants = () => {
    axios.get('/allapplicants', { params: { branchId: selectedBranch,status:selectedStatus } })
      .then(response => setApplicants(response.data))
      .catch(error => console.error('Error fetching pending job applications:', error));
  };


  const handleShowCV = () => {
    console.log('CV Show Clicked');
    
  };

  const handleShowSkills = () => {
    console.log('Skills Show clicked');
  };

  const handleCancel = () => {
    setSelectedMenuIndex(null);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const actionMenuItems = [
    { label: "Reject ", onClick: handleShowCV },
    { label: "Select", onClick: handleShowSkills },
    { label: "Cancel", onClick: handleCancel },
  ];

  const handleMenuClick = (index) => {
    setSelectedMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const headerData = ['Username', 'Experience', 'Job ID', 'Job Title', 'Actions'];

  return (
    <OwnerDashboradLayout>
        <div className="flex justify-between items-center my-2 mt-8">
          <p className="font-semibold text-2xl dark:text-gray-400">All Applicants</p>
          <select
            value={selectedBranch}
            onChange={handleBranchChange}
            className="border-gray-300 border p-2 rounded-l-md focus:outline-none focus:border-primary dark:bg-gray-900 dark:text-gray-400"
          >
            <option value=""  disabled>Select Branch</option>
            <option value="All">All</option>
            {branches.map(branch => (
              <option key={branch.branchId} value={branch.branchId}>{branch.branchId}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border-gray-300 border p-2 rounded-l-md focus:outline-none focus:border-primary dark:bg-gray-900 dark:text-gray-400"
          >
            <option value="" disabled>Select Status</option>
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="selected">Selected</option>
            <option value="reject">Rejected</option>
           
          </select>
        </div>
      <Table
        headerData={headerData}
        tableData={applicants.map((applicant, index) => [
          <div className="flex items-center">
            <div>
              <div>{applicant.username}</div>
            </div>
          </div>,
          applicant.experience,
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
