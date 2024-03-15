import React, { useState, useEffect } from 'react';
import axios from '../axios';
import SkillInput from '../components/Fields/SkillInput';
import Button from '../components/Buttons/Button';
import UserLayout from '../components/layouts/User/UserLayout';
import UserNavBar from '../components/Navbar/UserNavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Fields from '../components/Fields/Fields';

const ApplyforJob = () => {
  const navigate = useNavigate();
  const { jobVacancyID, jobTitle } = useLocation().state;

  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState(null);
  const [experience, setExperience] = useState('');
  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const [cvOption, setCvOption] = useState(null);
  const [skills, setSkills] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleCVOption = (option) => {
    setCvOption(option);
  };

  const handleFolderIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['pdf', 'doc', 'docx'];

      if (allowedExtensions.includes(fileExtension)) {
        setFile(file);
        setSelectedFileName(file.name);
      } else {
        setNotification('Invalid file type. Please upload a PDF or Word document.');
        setNotificationColor('red');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
        }, 3000);
      }
    }
  };

  const handleUploadButtonClick = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSkills(response.data.skills);
    } catch (error) {
      console.error('Error uploading file and extracting skills:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    /*try {
      let formData = new FormData();
      formData.append('applythrough', cvOption);
      formData.append('experience', experience);

      if (cvOption === 'withCV' && file) {
        formData.append('cv', file);
      }

      const token = localStorage.getItem('token');

      const response = await axios.post('/apply', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message === 'Application submitted successfully') {
        setNotification('Successfully applied!');
        setNotificationColor('green');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
          navigate('/jobs');
        }, 3000);
      }
    } catch (error) {
      setNotification('There was an error submitting the application. Please try again.');
      setNotificationColor('red');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor(null);
      }, 3000);

      console.error('Error submitting application:', error);
    }*/
  };

  return (
    <UserLayout>
      <UserNavBar />
      <div className="bg-gray-100 min-h-screen flex justify-center items-center dark:bg-gray-900">
        <div className="bg-white md:w-[400px] p-8 rounded shadow-md w-100 m-5 dark:bg-gray-700">
          <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
            <h1 className="text-3xl mb-7 font-bold dark:text-gray-400 text-center">Application Form</h1>
            {notification && (
              <div className={`bg-${notificationColor || 'red'}-500 text-white p-2 mb-4 mt-5 flex justify-between items-center`}>
                <span>{notification}</span>
                <button className="text-white" onClick={() => setNotification(null)}>
                  X
                </button>
              </div>
            )}
            <div className="mb-4">
              <Fields
                label='Experience'
                type='text'
                name='experience'
                placeholder='Enter Your experience'
                value={experience}
                handleChange={handleExperienceChange}
              />

              <label className="block text-gray-700 text-lg md:text-xl font-bold mb-2">
                Apply with CV or without CV
              </label>
              <div className="flex items-center md:mt-6 md:mb-6">
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

            {cvOption === 'withCV' && (
              <div className="border-2 border-dashed h-full dark:text-gray-400 my-2 md:my-4">
                <div className="flex flex-col items-center m-5" onClick={handleFolderIconClick}>
                  <i className="fa fa-folder-open fa-4x text-blue-700 cursor-pointer"></i>
                  <span className="block text-gray-400 font-normal">
                    {selectedFileName ? selectedFileName : 'Attach your files here'}
                  </span>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  className="h-full w-full opacity-0"
                  name="cv"
                  style={{}}
                  onChange={handleFileChange}
                />
              </div>
            )}

            {cvOption === 'withoutCV' && (
              <SkillInput label="Skills" skills={skills} setSkills={setSkills} />
            )}
            <div className='md:mt-8'>
              <Button text="Upload File" onClick={handleUploadButtonClick} />
              <Button text="Apply" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default ApplyforJob;
