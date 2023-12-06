import React, { useState } from 'react';
import axios from '../axios';
import SkillInput from '../components/Fields/SkillInput';
import Button from '../components/Buttons/Button';
import { useParams } from 'react-router-dom';

const ApplyforJob = () => {
  const { jobVacancyID, jobTitle } = useParams();

  const [cvOption, setCvOption] = useState(null);
  const [skills, setSkills] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleCVOption = (option) => {
    setCvOption(option);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('applythrough', cvOption);
      formData.append('skills', skills);
      formData.append('jobVacancyID', jobVacancyID);
      formData.append('jobTitle', jobTitle);

      if (cvOption === 'withCV' && file) {
        formData.append('cv', file);
      }

      const response = await axios.post('/apply', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('There was an error submitting the application. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center dark:bg-gray-900">
      <div className="bg-white p-8 rounded shadow-md w-96 m-5 dark:bg-gray-700">
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <h1 className="text-lg font-bold dark:text-gray-400">Application Form</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Apply with CV or without CV
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="withCV"
                name="cvOption"
                className="mr-2"
                onChange={() => handleCVOption('withCV')}
              />
              <label htmlFor="withCV">Apply with CV</label>
              <input
                type="radio"
                id="withoutCV"
                name="cvOption"
                className="ml-8 mr-2"
                onChange={() => handleCVOption('withoutCV')}
              />
              <label htmlFor="withoutCV">Apply without CV</label>
            </div>
          </div>

          <input
            type="file"
            id="fileInput"
            name="cv"
            style={{ }}
            onChange={handleFileChange}
          />

          {cvOption === 'withCV' && (
            <div className="border-2 border-dashed h-full dark:text-gray-400 my-2 md:my-4">
              {/* FileInput display for CV */}
              {/* ... */}
            </div>
          )}

          {cvOption === 'withoutCV' && (
            <SkillInput
              label="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          )}
          {error && <p className="text-red-500">{error}</p>}
          <Button text="Apply" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ApplyforJob;
