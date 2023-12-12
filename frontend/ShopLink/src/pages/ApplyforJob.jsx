// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import SkillInput from '../components/Fields/SkillInput';
import Button from '../components/Buttons/Button';
import UserLayout from '../components/layouts/User/UserLayout';
import UserNavBar from '../components/Navbar/UserNavBar';
import { useLocation, useNavigate } from 'react-router-dom';

const ApplyforJob = () => {
  const navigate = useNavigate();
  const { jobVacancyID, jobTitle } = useLocation().state;

  // State for managing notification and notification background color
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState(null);

  const [cvOption, setCvOption] = useState(null);
  const [skills, setSkills] = useState([]);
  const [file, setFile] = useState(null);

  const handleCVOption = (option) => {
    setCvOption(option);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvOption) {
      setNotification('Please select a method to apply.');
      setNotificationColor('red');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor(null);
      }, 3000);
      return;
    }

    if (cvOption === 'withCV' && !file) {
      setNotification('Please add CV.');
      setNotificationColor('red');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor(null);
      }, 3000);
      return;
    }

    if (cvOption === 'withoutCV' && skills.length === 0) {
      setNotification('Please enter skills manually.');
      setNotificationColor('red');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor(null);
      }, 3000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('applythrough', cvOption);
      formData.append('skills', skills);
      formData.append('jobVacancyID', jobVacancyID);
      formData.append('jobTitle', jobTitle);

      if (cvOption === 'withCV' && file) {
        formData.append('cv', file);
      }

      const token = localStorage.getItem('token');
      console.log(token);

      const response = await axios.post('/apply', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      // Check if the user has already applied
      if (response.data === 'You have already applied for this job.') {
        // Show notification in red and do not submit the form
        setNotification('You have already applied for this job.');
        setNotificationColor('red');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
        }, 3000);
      } else {
        // Successfully applied, show success notification in green and navigate to /jobs
        setNotification('Successfully applied!');
        setNotificationColor('green');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
          navigate('/jobs');
        }, 3000);
      }
    } catch (error) {
      // Show error notification in red
      setNotification('There was an error submitting the application. Please try again.');
      setNotificationColor('red');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor(null);
      }, 3000);

      console.error('Error submitting application:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  // Render the component
  return (
    <UserLayout UserLayout>
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
                  <div className="flex flex-col items-center m-5">
                      <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                    <span className="block text-gray-400 font-normal">Attach you files here</span>
                    </div>
                    <input type="file" id='fileInput'
                    className="h-full w-full opacity-0" name="cv"  style={{}}
                    onChange={handleFileChange}/>
                  </div>
            )}

            {cvOption === 'withoutCV' && (
              <SkillInput label="Skills" skills={skills} setSkills={setSkills} />
            )}
            <div className='md:mt-8'>
                  <Button text="Apply" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default ApplyforJob;
