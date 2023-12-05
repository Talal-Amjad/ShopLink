import React, { useState } from 'react';
import Fields from '../../components/Fields/Fields';
import Button from '../../components/Buttons/Button';

import ManagerDashnoardLayout from "../../components/layouts/BranchManager/managerDashboardLayout"
const PostJob = () => {
  

  const [jobID, setjobID] = useState("");
  const [jobTitile, setjobTitle] = useState("");
  const [salary, setSalary] = useState('');
  const [descripton, setDescripton] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <ManagerDashnoardLayout>  
       <div className="bg-gray-100 min-h-screen flex justify-center items-center  dark:bg-gray-700">
      <div className="bg-white p-8 rounded shadow-md w-[700px] dark:bg-gray-900 mt-6 mb-6">
        <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold   dark:text-gray-400">Post Job Details</h1>

            <Fields
          label="Job ID"
          type="text"
          placeholder="ex123"
          value={jobID}
          handleChange={(e) => setjobID(e.target.value)}
        />

        <Fields
          label="Job Title"
          type="text"
          placeholder="Manager"
          value={jobTitile}
          handleChange={(e) => setjobTitle(e.target.value)}
        />
         <Fields
          label="Expected Salary"
          type="number"
          placeholder="10000"
          value={salary}
          handleChange={(e) => setSalary(e.target.value)}
        />
         <Fields
          label="Job Decription"
          type="textarea"
          placeholder="Details about job"
          value={descripton}
          handleChange={(e) =>  setDescripton(e.target.value)}
        />
         <Fields
          label="Last Date to Apply"
          type="date"
          value={date}
          handleChange={(e) =>  setDate(e.target.value)}
        />
           
          <Button text="Post Job" type="submit" />
        </form>
      </div>
    </div>
  </ManagerDashnoardLayout>
 
  );
};

export default PostJob;
