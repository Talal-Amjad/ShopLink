import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import OwnerDashboardLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';

const ApproveJobs = () => {
  const [pendingJobs, setPendingJobs] = useState([]);

  useEffect(() => {
    axios.get('/pendingjobs')
      .then(response => setPendingJobs(response.data))
      .catch(error => console.error('Error fetching pending job applications:', error));
  }, []);


  const isDatePassed = (dateString) => {
    const currentDate = new Date();
    const lastDate = new Date(dateString);
    return currentDate > lastDate;
  };

  const shouldShowJob = (job) => {
    const daysToShowAfterLastDate = 2;
    const lastDate = new Date(job.lastDate);
    const showUntilDate = new Date(lastDate.setDate(lastDate.getDate() + daysToShowAfterLastDate));
    return !isDatePassed(showUntilDate);
  };



  const handleApproveClick = (job) => {
   
    const isApproved = window.confirm(`Are you sure to approve the job application for: ${job.jobTitle}?`);
    if (isApproved) {
      
      axios.post('updatejobstatus', { jobVacancyID: job.jobVacancyID, status: 'approve' })
        .then(response => {
          console.log(response.data.message);
          window.location.reload();
        })
        .catch(error => console.error('Error updating job status:', error));
    }
  };

  const handleRejectClick = (job) => {
    
    const isRejected = window.confirm(`Are you sure to reject the job application for: ${job.jobTitle}?`);
    if (isRejected) {
      
      axios.post('updatejobstatus', { jobVacancyID: job.jobVacancyID, status: 'reject' })
        .then(response => {
          console.log(response.data.message);
          window.location.reload();
        })
        .catch(error => console.error('Error updating job status:', error));
    }
  };

  return (
    <OwnerDashboardLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mx-6">
          {pendingJobs.map((job) => (
            <div key={job.jobVacancyID} className="bg-white p-6 shadow-md rounded-md w-full dark:bg-gray-700 dark:text-white">
              <h2 className="text-xl font-bold mb-4 text-center">{job.jobTitle}</h2>
              <h2 className="text-xl font-bold mb-4">Job Description</h2>
              <p className="mb-4">{job.jobDescription}</p>
              <div className='flex'>
                <h2 className="text-xl font-bold mb-4">Expected Salary:</h2>
                <p className="mb-4">&nbsp;{`${job.expectedSalary.toLocaleString()}`}</p>
              </div>
              <p className="text-gray-600 dark:text-[#F2F4F4] mb-4">Last Date to Apply: {job.lastDate.substring(0, 10)}</p>
              <div className="flex justify-between">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </OwnerDashboardLayout>
  );
};

export default ApproveJobs;
