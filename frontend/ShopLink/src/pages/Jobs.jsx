import React, { useEffect, useState } from 'react';
import axios from "./../axios";
import UserLayout from '../components/layouts/User/UserLayout';
import { FaFilter, FaSortAmountDown, FaSortAmountUp, FaCalendarAlt } from 'react-icons/fa';
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import UserNavBar from '../components/Navbar/UserNavBar';


const Jobs = () => {
  const navigate = useNavigate(); 
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null); // 'salary' or 'lastDate'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [showSalaryOptions, setShowSalaryOptions] = useState(false);
  const [showDateOptions, setShowDateOptions] = useState(false);

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
    console.log(`You Applied for ${job.jobVacancyID} (Branch ID: ${job.branchId})`);
    const jobVacancyID = job.jobVacancyID;
    const jobTitle = job.jobTitle;
    const branchId = job.branchId;

    navigate('/applyforjob',{
      state: {
        jobVacancyID,
        jobTitle,
        branchId,
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

  const handleSortBySalary = () => {
    setShowSalaryOptions(!showSalaryOptions);
    setShowDateOptions(false);
  };

  const handleSortByLastDate = () => {
    setShowDateOptions(!showDateOptions);
    setShowSalaryOptions(false);
  };

  const handleSortOption = (criteria, order) => {
    setSortBy(criteria);
    setSortOrder(order);
    setShowSalaryOptions(false);
    setShowDateOptions(false);
  };

  // Sorting function based on selected criteria and order
  const sortJobs = (jobs) => {
    if (sortBy === 'salary') {
      return jobs.sort((a, b) => {
        const salaryA = a.expectedSalary;
        const salaryB = b.expectedSalary;
        return sortOrder === 'asc' ? salaryA - salaryB : salaryB - salaryA;
      });
    } else if (sortBy === 'lastDate') {
      return jobs.sort((a, b) => {
        const dateA = new Date(a.lastDate);
        const dateB = new Date(b.lastDate);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else {
      return jobs;
    }
  };

  const sortedJobs = sortJobs(jobs);

  return (
    <UserLayout>
      <UserNavBar onSearch={handleSearch}></UserNavBar>
      <div className="container mx-auto p-8">
      <div className='flex items-center justify-between mt-24 mb-12'>
  <h1 className="text-3xl font-bold dark:text-white">Available Jobs</h1>
  <div className="flex items-center space-x-4">
  <div className="filter flex items-center text-xl font-sans text-black dark:text-gray-400 cursor-pointer">
      <span className="filter-icon mr-1">
        <FaFilter className="filter-icon-inner" size={30} />
      </span>
      <button className="hidden md:flex items-center bg-none border-none cursor-pointer">
        Filters : 
      </button>
    </div>
    <div className={`filter flex items-center text-xl font-sans dark:text-gray-400 cursor-pointer`} onClick={handleSortBySalary}>
      <span className={`filter-icon mr-1 ${sortBy === 'salary' ? 'text-blue-500' : ''}`}>
        {sortBy === 'salary' && sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
      </span>
      <button className={`hidden md:flex items-center bg-none border-none cursor-pointer ${sortBy === 'salary' ? 'text-blue-500' : ''}`} onClick={handleSortBySalary}>
        {sortBy === 'salary' && sortOrder === 'asc' ? 'Increasing Salary' : sortOrder === 'desc' ? 'Decreasing Salary' : 'Sort By Salary'}
      </button>
      {showSalaryOptions && (
        <div className="shadow-md p-4 rounded-md ml-2 mt-[98px]">
          <div className="flex flex-col">
            <span className="cursor-pointer flex flex-row" onClick={() => handleSortOption('salary', 'asc')}><FaSortAmountUp /> Increasing</span>
            <span className="cursor-pointer flex flex-row" onClick={() => handleSortOption('salary', 'desc')}><FaSortAmountDown /> Decreasing</span>
          </div>
        </div>
      )}
    </div>
    <div className={`filter flex items-center text-xl font-sans dark:text-gray-400 cursor-pointer`} onClick={handleSortByLastDate}>
      <span className={`filter-icon mr-1 ${sortBy === 'lastDate' ? 'text-blue-500' : ''}`}>
        <FaCalendarAlt />
      </span>
      <button className={`hidden md:flex items-center bg-none border-none cursor-pointer ${sortBy === 'lastDate' ? 'text-blue-500' : ''}`} onClick={handleSortByLastDate}>
        {sortBy === 'lastDate' && sortOrder === 'asc' ? 'Increasing Last Date' : sortOrder === 'desc' ? 'Decreasing Last Date' : 'Sort by Last Date'}
      </button>
      {showDateOptions && (
        <div className="shadow-md p-4 rounded-md ml-2 mt-[98px]">
          <div className="flex flex-col">
            <span className="cursor-pointer flex flex-row" onClick={() => handleSortOption('lastDate', 'asc')}><FaSortAmountUp /> Increasing</span>
            <span className="cursor-pointer flex flex-row" onClick={() => handleSortOption('lastDate', 'desc')}><FaSortAmountDown /> Decreasing</span>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mx-6">
          {sortedJobs.map((job) => (
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
                  <h2 className="text-xl font-bold mb-2">Required Experience:</h2>
                  <p className="mb-4 text-lg">&nbsp;&nbsp;&nbsp;{`${job.experience}`}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Required Skills:</h2>
                  <div className="mb-4 text-lg">
                    {JSON.parse(job.skills).map((skill, index) => (
                      <p key={index}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; {skill}</p>
                    ))}
                  </div>
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
