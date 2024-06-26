import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import NoDataFound from '../NoDataFound';

const ApplicantsSkillReport = () => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [applicants, setApplicants] = useState([]);
    
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const username = decodedToken.username;

    useEffect(() => {
        axios.get('/skillsreport', {
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


  const handleSelect = (username) => {
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
        axios.put('/updatestatus', { username, status: 'selected' })
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
  
  const handleReject = (username) => {
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
        axios.put('/updatestatus', { username, status: 'rejected' })
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

 

  

  const handleShowSkills = (title, skills) => {
    Swal.fire({
      title: title,
      html: skills.map(skill => `<div>${skill}</div>`).join(''), // Show each skill in a separate div
      confirmButtonText: 'Close'
    });
  };

  const headerData = ['Username','Job Title','Matched Skills', 'Missing Skills', 'Score', 'Actions'];

    return (
        <ManagerDashboardLayout>
            <div className="flex justify-between items-center my-2 mt-8">
                <div className="flex items-center"> 
                    <p className="font-semibold text-2xl dark:text-gray-400">
                        {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}{selectedStatus === 'reject' ? 'ed' : selectedStatus === 'approve' ? 'd' : ''} Applicants
                    </p>
                </div>
                <div className="flex items-center"> 
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
                        applicant.jobTitle,
                        applicant.matchedSkills.length > 0 ? (
                            <div
                                className="cursor-pointer text-primary"
                                onClick={() => handleShowSkills("Matched Skills", applicant.matchedSkills)}
                            >
                                {applicant.matchedSkills.length} <div className='text-sm'>View Matched Skills</div>
                            </div>
                        ) : (
                            <div>
                                {applicant.matchedSkills.length}
                            </div>
                        ),
                        applicant.missedSkills.length > 0 ? (
                            <div
                                className="cursor-pointer text-primary"
                                onClick={() => handleShowSkills("Missing Skills", applicant.missedSkills)}
                            >
                                {applicant.missedSkills.length} <div className='text-sm'>View Missing Skills</div>
                            </div>
                        ) : (
                            <div>
                                {applicant.missedSkills.length}
                            </div>
                        ),
                        applicant.score.toFixed(2),
                        <div>
                            {applicant.status === 'selected' ? (
                                <span className="text-green-500">Selected</span>
                            ) : (
                                <>
                                    <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" onClick={() => handleSelect(applicant.username)}>Select</button>
                                    <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" onClick={() => handleReject(applicant.username)}>Reject</button>
                                </>
                            )}
                        </div>
                    ])}
                />
            )}
        </ManagerDashboardLayout>
    );
};

export default ApplicantsSkillReport;