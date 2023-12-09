import React, { useEffect, useState } from 'react';
import axios from "./../axios";
import UserLayout from '../components/layouts/User/UserLayout';
import { useNavigate} from "react-router-dom";

import UserNavBar from '../components/Navbar/UserNavBar';
const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    console.log(`Applied for ${job.jobTitle} (Job ID: ${job.jobVacancyID})`);
    navigate({
      pathname: '/applyforjob',
      state: {
        jobVacancyID: job.jobVacancyID,
        jobTitle: job.jobTitle,
      },
    });
  };
  

  const handleSearch = async (searchInput) => {
    setSearchTerm(searchInput);

    try {
      const response = await axios.get('/alljobs');
      const filteredJobs = response.data.filter(job => job.jobTitle.toLowerCase().includes(searchInput.toLowerCase()));
      setJobs(filteredJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <UserLayout>
      <UserNavBar onSearch={handleSearch}></UserNavBar>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 mt-14 dark:text-white">Available Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mx-6">
          {jobs.map((job) => (
            <div key={job.jobVacancyID} className="bg-white p-6 shadow-md rounded-md w-full dark:bg-gray-900 dark:text-white">
              <h2 className="text-xl font-bold mb-4 text-center">{job.jobTitle}</h2>
              <h2 className="text-xl font-bold mb-4">Job Description</h2>
              <p className="mb-4">{job.jobDiscription}</p>
              <div className='flex flex-col'>
                <div className='md:flex'>
                  <h2 className="text-xl font-bold mb-2">Expected Salary:</h2>
                  <p className="mb-4 text-lg">&nbsp;&nbsp;&nbsp;{`${job.expectedSalary.toLocaleString()}`}</p>
                </div>
                <div className='md:flex'>
                  <h2 className="text-xl font-bold mb-2">Last Date &nbsp;&nbsp;&nbsp;:</h2>
                  <p className="dark:text-[#F2F4F4] text-lg">&nbsp;&nbsp;&nbsp;{job.lastDate.substring(0, 10)}</p>
                </div>
              </div>
              <button
                className={`${
                  isDatePassed(job.lastDate) || !shouldShowJob(job)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500'
                } text-white px-4 py-2 rounded-md mt-4`}
                disabled={isDatePassed(job.lastDate) || !shouldShowJob(job)}
                onClick={() => handleApplyClick(job)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Jobs;
