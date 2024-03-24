import React, { useState } from 'react';
import axios from '../axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SkillInput from '../components/Fields/SkillInput';
import Button from '../components/Buttons/Button';
import UserLayout from '../components/layouts/User/UserLayout';
import UserNavBar from '../components/Navbar/UserNavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Fields from '../components/Fields/Fields';

const MySwal = withReactContent(Swal);

const ApplyforJob = () => {
  const navigate = useNavigate();
  const { jobVacancyID, jobTitle, branchId } = useLocation().state;
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState(null);
  const [experience, setExperience] = useState('');
  const [cvOption, setCvOption] = useState('withoutCV');
  const [skills, setSkills] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleFolderIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['pdf'];
      if (allowedExtensions.includes(fileExtension)) {
        setFile(file);
        setSelectedFileName(file.name);
      } else {
        setNotification('Invalid file type. Please upload a PDF Document.');
        setNotificationColor('red');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
        }, 3000);
      }
    }
  };

  const handleUploadButtonClick = async (e) => {
    e.preventDefault();
    if (!file) {
      setNotification('Please attach a file.');
      setNotificationColor('red');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor(null);
      }, 3000);
      return; // Stop execution if no file is attached
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.skills) {
        const formattedSkills = response.data.skills.split(/[,\n;]/).map(skill => skill.trim());
        setSkills(formattedSkills);
      }
      // Display notification
      setNotification('Skills extracted successfully.');
      setNotificationColor('green');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor(null);
        setCvOption('withoutCV');
      }, 3000);
    } catch (error) {
      console.error('Error uploading file and extracting skills:', error);
      setNotification('Error extracting skills from the uploaded file.');
      setNotificationColor('red');
      setTimeout(() => {
        setNotification(null);
        setNotificationColor(null);
      }, 3000);
    }
  };
  

  const handleVerifySkills = () => {
    MySwal.fire({
      title: 'Confirm Skills',
      html: (
        <div>
          {skills.map((skill, index) => {
            // Split skill text by common separators (comma, semicolon, newline, etc.)
            const skillItems = skill.split(/[,\n;]/);
            return (
              <div key={index}>
                {skillItems.map((item, idx) => (
                  // Trim each item to remove leading/trailing spaces and render as a separate paragraph
                  <p key={`${index}-${idx}`}>{item.trim()}</p>
                ))}
              </div>
            );
          })}
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    });
  };
  
 const handleAddMoreSkills = () => {
    setNotification(null);
    setNotificationColor(null);
    setCvOption('withoutCV');
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!experience.trim()) {
        setNotification('Please enter your experience.');
        setNotificationColor('red');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
        }, 3000);
        return;
      }
  
      // Check if either skills are entered manually or a file is uploaded
      if (cvOption === 'withCV' && !file) {
        setNotification('Please upload a file to extract skills.');
        setNotificationColor('red');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
        }, 3000);
        return;
      } else if (cvOption === 'withoutCV' && skills.length === 0) {
        setNotification('Please enter skills manually or upload a file to extract skills.');
        setNotificationColor('red');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
        }, 3000);
        return;
      }
  
      // Format skills before saving
      const formattedSkills = skills.join('\n•\n');
  
      const token = localStorage.getItem('token');
      console.log("--------------------------");
      console.log('experience', experience);
      console.log('skills', formattedSkills);
      console.log('jobVacancyID', jobVacancyID);
      console.log('jobTitle', jobTitle);
      console.log('branchId', branchId);
      console.log("--------------------------");
  
      const formData = {
        experience,
        skills: formattedSkills, // Send formatted skills
        jobVacancyID,
        jobTitle,
        branchId
      };
  
      const response = await axios.post('/apply2', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 409 && response.data.message === 'You have already applied for this job') {
        // Handle case where user has already applied for the job
        setNotification(response.data.message);
        setNotificationColor('red');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
        }, 3000);
      } else if (response.data.message === 'Application submitted successfully') {
        // Handle case where application is submitted successfully
        setNotification('Successfully applied!');
        setNotificationColor('green');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
          navigate('/jobs');
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409 && error.response.data.message === 'You have already applied for this job') {
        // Handle case where user has already applied for the job
        setNotification(error.response.data.message);
        setNotificationColor('red');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
        }, 3000);
      } else {
        // Handle other errors
        setNotification('There was an error submitting the application. Please try again.');
        setNotificationColor('red');
        setTimeout(() => {
          setNotification(null);
          setNotificationColor(null);
        }, 3000);
        console.error('Error submitting application:', error);
      }
    }
  };
  
  
return (
  <UserLayout>
    <UserNavBar />
    <div className="bg-gray-100 min-h-screen flex justify-center items-center dark:bg-gray-900">
      <div className="bg-white md:w-[400px] max-md:w-1/2 pt-0 pr-8 pl-8 rounded shadow-md mt-40 mb-40 dark:bg-gray-700">
        <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
          <h1 className="text-3xl mb-7 font-bold mt-5 dark:text-gray-400 text-center">Application Form</h1>
          {notification && (
            <div className={`bg-${notificationColor || 'red'}-500 text-white p-2 mb-4 mt-5 flex justify-between items-center`}>
              <span>{notification}</span>
              {notification && (
                <>
                  {notification.includes('Skills extracted successfully.')}
                  <button className="text-white" onClick={() => setNotification(null)}>
                    X
                  </button>
                </>
              )}
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
                onChange={() => setCvOption('withCV')}
                checked={cvOption === 'withCV'}
              />
              <label htmlFor="withCV">Apply with CV</label>
              <input
                type="radio"
                id="withoutCV"
                name="cvOption"
                className="ml-8 mr-2"
                onChange={() => setCvOption('withoutCV')}
                checked={cvOption === 'withoutCV'}
              />
              <label htmlFor="withoutCV">Apply without CV</label>
            </div>
          </div>
          {cvOption === 'withCV' && (
            <div>
              <div className="border-2 border-dashed h-full dark:text-gray-400 my-2 md:my-4">
                <div className="flex flex-col items-center m-2" onClick={handleFolderIconClick}>
                  <i className="fa fa-folder-open fa-4x text-blue-700 cursor-pointer"></i>
                  <span className="block text-gray-400 font-normal">
                    {selectedFileName ? selectedFileName : 'Attach your files here'}
                  </span>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  id="fileInput"
                  className="h-full w-full opacity-0"
                  name="cv"
                  style={{}}
                  onChange={handleFileChange}
                />
              </div>
              <Button text="Upload File" onClick={handleUploadButtonClick} />
            </div>
          )}
          {cvOption === 'withoutCV' && (
            <>
              <SkillInput label="Skills" skills={skills} setSkills={setSkills} />
            </>
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
