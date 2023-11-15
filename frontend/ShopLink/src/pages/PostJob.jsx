// App.js
import React, { useState } from 'react';
import Fields from '../components/Fields/Fields';
import Button from '../components/Buttons/Button';
import FileInput from '../components/Fields/FileInput';
const PostJob = () => {
  
  const [jobTitile, setjobTitle] = useState("");
  const [salary, setSalary] = useState('');
  const [descripton, setDescripton] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center  dark:bg-gray-900">
      <div className="bg-white p-8 rounded shadow-md w-96 m-5  dark:bg-gray-700 ">
        <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold   dark:text-gray-400">Post Job Details</h1>
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
           <FileInput label="Upload Job Ad" height={200} />

          <Button text="Post Job" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default PostJob;
