import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import OwnerDashboradLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';
import NoDataFound from '../NoDataFound';


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
    axios.get('/allapplicants', { params: { branchId: selectedBranch, status: selectedStatus } })
      .then(response => setApplicants(response.data))
      .catch(error => console.error('Error fetching applicants:', error));
  };

  
  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };



  const headerData = ['Username', 'Experience', 'Job ID', 'Job Title'];

  return (
    <OwnerDashboradLayout>
      <div className="container mx-auto p-8">
      <div className="flex justify-between items-center my-2 mt-8">
  <p className="font-semibold text-2xl dark:text-gray-400">All Applicants</p>
  <div className="flex">
  <h3 className='text-lg font-semibold m-3'>Branch Code : </h3>
    <select
      value={selectedBranch}
      onChange={handleBranchChange}
      className="border-gray-300 border p-2 rounded-l-md focus:outline-none focus:border-primary dark:bg-gray-900 dark:text-gray-400 mr-2"
    >
      <option value="" disabled>Select Branch</option>
      <option value="All">All</option>
      {branches.map(branch => (
        <option key={branch.branchId} value={branch.branchId}>{branch.branchId}</option>
      ))}
    </select>
    <h3 className='text-lg font-semibold m-3'>Status : </h3>
    <select
      value={selectedStatus}
      onChange={handleStatusChange}
      className="border-gray-300 border p-2 rounded-l-md focus:outline-none focus:border-primary dark:bg-gray-900 dark:text-gray-400"
    >
      <option value="" disabled>Select Status</option>
      <option value="All">All</option>
      <option value="pending">Pending</option>
      <option value="selected">Selected</option>
      <option value="rejected">Rejected</option>
    </select>
  </div>
</div>

        {applicants.length === 0 ? (
          <NoDataFound />
        ) : (
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
            ])}
          />
        )}
      </div>
    </OwnerDashboradLayout>
  );
};

export default ViewAllApplicants;
