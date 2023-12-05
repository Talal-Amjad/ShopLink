import React from 'react';

const jobsData = [
  {
    id: 1,
    title: 'Software Engineer',
    description: 'Exciting opportunity for a software engineer...',
    lastDate: '2023-12-31',
  },
  {
    id: 2,
    title: 'Graphic Designer',
    description: 'Join our creative team as a graphic designer...',
    lastDate: '2023-12-15',
  },
  {
    id: 3,
    title: 'Data Analyst',
    description: 'Analyze and interpret complex data sets...',
    lastDate: '2023-11-01', 
  },
  {
    id: 3,
    title: 'Senior Data Analyst',
    description: 'Analyze and interpret complex data sets...',
    lastDate: '2023-12-04', 
  },
];

const Jobs = () => {
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
  };

  const visibleJobs = jobsData.filter((job) => shouldShowJob(job));

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mx-6">
        {visibleJobs.map((job) => (
          <div key={job.id} className="bg-[#F2F4F4] p-6 shadow-md rounded-md w-full dark:bg-gray-700 dark:text-white">
            <h2 className="text-xl font-bold mb-4">{job.title}</h2>
            <p className="mb-4">{job.description}</p>
            <p className="text-gray-600 dark:text-[#F2F4F4] mb-4">Last Date to Apply: {job.lastDate}</p>
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
