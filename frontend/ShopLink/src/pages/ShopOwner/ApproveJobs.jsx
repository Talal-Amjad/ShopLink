import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios';
import Swal from 'sweetalert2';
import OwnerDashboardLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';

const ApproveJobs = () => {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    axios.get('/allbranchesids')
      .then(response => setBranches(response.data))
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  useEffect(() => {
    fetchPendingJobs();
  }, [selectedBranch, selectedStatus]);

  const fetchPendingJobs = () => {
    axios.get('/pendingjobs', { params: { branchId: selectedBranch, status: selectedStatus } })
      .then(response => setPendingJobs(response.data))
      .catch(error => console.error('Error fetching pending job applications:', error));
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const isDatePassed = (dateString) => {
    const currentDate = new Date();
    const lastDate = new Date(dateString);
    return currentDate > lastDate;
  };

  const shouldShowJob = (job) => {
    const daysToShowAfterLastDate = 2;
    const lastDate = new Date(job.lastDate);
    const showUntilDate = new Date(lastDate);
    showUntilDate.setDate(showUntilDate.getDate() + daysToShowAfterLastDate);

    const currentDate = new Date();
    return currentDate <= showUntilDate;
  };

  const handleApproveClick = (job) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this job application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('updatejobstatus', { jobVacancyID: job.jobVacancyID, status: 'approve' })
          .then(response => {
            Swal.fire({
              title: "Approved!",
              text: response.data.message,
              icon: "success"
            }).then(() => window.location.reload());

          })
          .catch(error => console.error('Error updating job status:', error));
        axios.post('/savejobnotification', {
          jobVacancyID: job.jobVacancyID,
          branchId: job.branchId,
          title: 'Job Approved',
          status: 'unread'
        })
          .then(response => {
            // Existing code remains the same
          })
          .catch(error => console.error('Error updating job status:', error));
      }
    });
  };

  const handleRejectClick = (job) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this job application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('updatejobstatus', { jobVacancyID: job.jobVacancyID, status: 'reject' })
          .then(response => {
            Swal.fire({
              title: "Rejected!",
              text: response.data.message,
              icon: "error"
            }).then(() => window.location.reload());
          })
          .catch(error => console.error('Error updating job status:', error));
        axios.post('/savejobnotification', {
          jobVacancyID: job.jobVacancyID,
          branchId: job.branchId,
          title: 'Job Rejected',
          status: 'unread'
        })
          .then(response => {
            // Existing code remains the same
          })
          .catch(error => console.error('Error updating job status:', error));
      }
    });
  };

  const renderButton = (job) => {
    if (job.status === 'pending') {
      return (
        <>
          <button
            className={`${
              isDatePassed(job.lastDate) || !shouldShowJob(job)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500'
            } text-white px-4 py-2 rounded-md`}
            disabled={isDatePassed(job.lastDate) || !shouldShowJob(job)}
            onClick={() => handleApproveClick(job)}
          >
            Approve
          </button>
          <button
            className={`${
              isDatePassed(job.lastDate) || !shouldShowJob(job)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500'
            } text-white px-4 py-2 rounded-md`}
            disabled={isDatePassed(job.lastDate) || !shouldShowJob(job)}
            onClick={() => handleRejectClick(job)}
          >
            Reject
          </button>
        </>
      );
    } else if (job.status === 'approve') {
      return (
        <button
          className={`${
            isDatePassed(job.lastDate) || !shouldShowJob(job)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500'
          } text-white px-4 py-2 rounded-md`}
          disabled={isDatePassed(job.lastDate) || !shouldShowJob(job)}
          onClick={() => handleRejectClick(job)}
        >
          Close
        </button>
      );
    } else if (job.status === 'reject') {
      return (
        <button
          className={`${
            isDatePassed(job.lastDate) || !shouldShowJob(job)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500'
          } text-white px-4 py-2 rounded-md`}
          disabled={isDatePassed(job.lastDate) || !shouldShowJob(job)}
          onClick={() => handleApproveClick(job)}
        >
          Open
        </button>
      );
    }
  };

  return (
    <OwnerDashboardLayout>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center my-2 mt-8">
        <p className="font-semibold text-2xl dark:text-gray-400">
  {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}{selectedStatus === 'reject' ? 'ed' : selectedStatus === 'approve' ? 'd' : ''} Jobs
</p>

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
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border-gray-300 border p-2 rounded-l-md focus:outline-none focus:border-primary dark:bg-gray-900 dark:text-gray-400"
          >
            <option value="" disabled>Select Status</option>
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="approve">Approved</option>
            <option value="reject">Rejected</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mx-6">
          {pendingJobs.map((job) => (
            shouldShowJob(job) && (
              <div key={job.jobVacancyID} className="bg-white p-6 shadow-md rounded-md w-full dark:bg-gray-700 dark:text-white">
                <h2 className="text-xl font-bold mb-4 text-center">{job.jobTitle}</h2>
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <p className="mb-4">{job.jobDiscription}</p>
                <div className='flex'>
                  <h2 className="text-xl font-bold mb-4">Expected Salary:</h2>
                  <p className="mb-4">&nbsp;{`${job.expectedSalary.toLocaleString()}`}</p>
                </div>
                <div className='flex'>
                  <h2 className="text-xl font-bold mb-4">Required Experience:</h2>
                  <p className="mb-4">&nbsp;{`${job.experience.toLocaleString()}`}</p>
                </div>
                <div className="mb-4 text-lg">
                  {JSON.parse(job.skills).map((skill, index) => (
                    <p key={index}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; {skill}</p>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-[#F2F4F4] mb-4">Last Date to Apply: {job.lastDate.substring(0, 10)}</p>
                <div className="flex justify-between">
                  {renderButton(job)}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      <ToastContainer />
    </OwnerDashboardLayout>
  );
};

export default ApproveJobs;

