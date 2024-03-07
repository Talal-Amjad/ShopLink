import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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

const ApplicantsSkillReport = () => {
  const navigate = useNavigate();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [currentCV, setCurrentCV] = useState('');

  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get('/skillsreport')
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setApplicants(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      });
  }, []);


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
        Swal.fire({
          title: "Selected!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
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
      })
      .catch(error => {
        console.error('Error selecting application:', error);
        // Handle error as needed
      });
      }
      if (result.isDismissed) {
        Swal.fire({
          title: "Canclled!",
          icon: "error",
          confirmButtonColor: "#3085d6",
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
        Swal.fire({
          title: "Rejected!",
          icon: "success",
          confirmButtonColor: "#3085d6",
    
        });
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
      })
      .catch(error => {
        console.error('Error rejecting application:', error);
        // Handle error as needed
      });
      }
      if (result.isDismissed) {
        Swal.fire({
          title: "Canclled!",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };

  
  const handleCancel = () => {
    setSelectedMenuIndex(null);
    setCurrentCV('');
  };

  const actionMenuItems = [
    { label: "Select", onClick: (username) => handleSelect(username) },
    { label: "Reject", onClick: (username) => handleReject(username) },
    { label: "Cancel", onClick: handleCancel },
  ];

  const handleMenuClick = (index) => {
    setSelectedApplicantIndex(index);
    setSelectedMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleShowSkills = (title, skills) => {
    Swal.fire({
      title: title,
      html: skills.map(skill => `<div>${skill}</div>`).join(''), // Show each skill in a separate div
      confirmButtonText: 'Close'
    });
  };

  const headerData = ['Username', 'Matched Skills', 'Missing Skills', 'Score', 'Actions'];

  return (
    <ManagerDashboardLayout>
      <Table
        headerData={headerData}
        tableData={applicants.map((applicant, index) => [
          <div className="flex items-center">
            <div>
              <div>{applicant.username}</div>
            </div>
          </div>,
          <div
            className="cursor-pointer text-primary"
            onClick={() => handleShowSkills("Matched Skills", applicant.matchedSkills)}
          >
            {applicant.matchedSkills.length} <div className='text-sm'>View Matched Skills</div>
          </div>,
          <div
            className="cursor-pointer text-primary"
            onClick={() => handleShowSkills("Missing Skills", applicant.missedSkills)}
          >
            {applicant.missedSkills.length} <div className='text-sm'>View Missing Skills</div>
          </div>,
          applicant.score.toFixed(2), // Display score rounded to 2 decimal places
          <div
            className="flex justify-center cursor-pointer"
            onClick={() => handleMenuClick(index)}
          >
            <FiMoreVertical />
          </div>,
          selectedMenuIndex === index && (
            <Actions
              menuItems={actionMenuItems.map((item) => ({
                ...item,
                onClick: () => {
                  item.onClick(applicant.username);
                  handleMenuClick(index);
                },
              }))}
            />
          ),
        ])}
      />
    </ManagerDashboardLayout>
  );
};

export default ApplicantsSkillReport;