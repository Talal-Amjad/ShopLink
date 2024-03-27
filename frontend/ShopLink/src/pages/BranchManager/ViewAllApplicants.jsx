import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NoDataFound from '../NoDataFound'; // Import the NoDataFound component


const ViewAllApplicants = () => {
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
    axios.get('/applicants', {
      params: { username, role, status: selectedStatus }
    })
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setApplicants(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      });
  }, [selectedStatus]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

 
  const handleSelect = (username,jobVacancyID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Select this Candidate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Select Candidate!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put('/updatestatus', { username, jobVacancyID,status: 'selected' })
          .then(response => {
            console.log('Application selected successfully:', response.data);
            // Update the local state with the updated status
            const updatedApplicants = applicants.map(applicant => {
              if (applicant.username === username) {
                return { ...applicant, status: 'selected' };
              }
              return applicant;
            });
            setApplicants(updatedApplicants);
            Swal.fire("Selected!", "The candidate has been selected.", "success");
          })
          .catch(error => {
            console.error('Error selecting application:', error);
            // Handle error as needed
            Swal.fire("Error!", "An error occurred while selecting the candidate.", "error");
          });
      }
    });
  };
  
  const handleReject = (username,jobVacancyID) => {
    console.log("ID",jobVacancyID);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Reject this Candidate?",
      icon: "warning",
      iconColor:"	#d33",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject Candidate!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put('/updatestatus', { username, jobVacancyID,status: 'rejected' })
        
          .then(response => {
            console.log('Application rejected successfully:', response.data);
            // Update the local state with the updated status
            const updatedApplicants = applicants.map(applicant => {
              if (applicant.username === username) {
                return { ...applicant, status: 'rejected' };
              }
              return applicant;
            });
            setApplicants(updatedApplicants);
            Swal.fire("Rejected!", "The candidate has been rejected.", "success");
          })
          .catch(error => {
            console.error('Error rejecting application:', error);
            // Handle error as needed
            Swal.fire("Error!", "An error occurred while rejecting the candidate.", "error");
          });
      }
    });
  };
  



  const handleViewSkillReport = () => {
    navigate('/skillsreport');
  };

  const headerData = ['Username', 'Experience', 'Job ID', 'Job Title', 'Actions'];

  return (
    <ManagerDashboardLayout>
   <div className="flex justify-between items-center my-2 mt-8">
  <div className="flex items-center"> {/* Flex container for text */}
    <p className="font-semibold text-2xl dark:text-gray-400">
      {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}{selectedStatus === 'reject' ? 'ed' : selectedStatus === 'approve' ? 'd' : ''} Applicants
    </p>
  </div>
  <div className="flex items-center"> {/* Flex container for select field */}
    <h3 className='text-xl font-semibold m-3'>Status : </h3>
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
            <div>
              {applicant.status === 'selected' ? (
                <span className="text-green-500">Selected</span>
              ) : (
                <>
                  <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" onClick={() => handleSelect(applicant.username, applicant.jobVacancyID)}>Select</button>
                  <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" onClick={() => handleReject(applicant.username, applicant.jobVacancyID)}>Reject</button>
                </>
              )}
            </div>
          ])}
        />
      )}
      <button
        className="bottom-4 right-4 px-4 py-2 bg-primary text-white rounded m-10"
        onClick={handleViewSkillReport}
      >
        View Applicant's Skill Report
      </button>
    </ManagerDashboardLayout>
  );
};

export default ViewAllApplicants;