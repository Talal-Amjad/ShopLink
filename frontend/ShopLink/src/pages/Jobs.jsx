import React, { useEffect, useState } from 'react';
import axios from "./../axios";
import ApplyforJob from './ApplyforJob';
import { useNavigate } from "react-router-dom";


const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/alljobs'); 
        console.log(response);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
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

  const handleApplyClick = (job) => {
    console.log(`Applied for ${job.title}`);
    navigate('/applyforjob');
  };

  const visibleJobs = jobs.filter((job) => shouldShowJob(job));

  return (
    <div className="container mx-auto p-8">
    <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mx-6">
      {visibleJobs.map((job) => (
        <div key={job.jobVacancyID} className="bg-[#F2F4F4] p-6 shadow-md rounded-md w-full dark:bg-gray-700 dark:text-white">
          <h2 className="text-xl font-bold mb-4 text-center">{job.jobTitle}</h2>
          <h2 className="text-xl font-bold mb-4">Job Description</h2>
          <p className="mb-4">{job.jobDiscription}</p>
          <div className='flex'>
            <h2 className="text-xl font-bold mb-4">Expected Salary:</h2>
            <p className="mb-4">&nbsp;{`${job.expectedSalary.toLocaleString()}`}</p>
          </div>
          <p className="text-gray-600 dark:text-[#F2F4F4] mb-4">Last Date to Apply: {job.lastDate.substring(0, 10)}</p>
          <button
            className={`${
              isDatePassed(job.lastDate) || !shouldShowJob(job)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500'
            } text-white px-4 py-2 rounded-md`}
            disabled={isDatePassed(job.lastDate) || !shouldShowJob(job)}
            onClick={() => handleApplyClick(job)}
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Jobs;
