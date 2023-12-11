import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SkillInput from '../components/Fields/SkillInput';
import Button from '../components/Buttons/Button';
import UserLayout from '../components/layouts/User/UserLayout';
import UserNavBar from '../components/Navbar/UserNavBar';
import { useLocation, useNavigate } from 'react-router-dom';

const ApplyforJob = () => {
  const navigate = useNavigate();
  const { jobVacancyID, jobTitle } = useLocation().state;

  // State for managing notification
  const [notification, setNotification] = useState(null);

  const formik = useFormik({
    initialValues: {
      cvOption: '',
      file: null,
      skills: [],
    },
    validationSchema: Yup.object({
      cvOption: Yup.string().required('Please select one option'),
      file: Yup.mixed().when('cvOption', {
        is: 'withCV',
        then: Yup.mixed().required('File is required'),
        otherwise: Yup.mixed().notRequired(),
      }),
      skills: Yup.array().when('cvOption', {
        is: 'withoutCV',
        then: Yup.array().required('Skills are required'),
        otherwise: Yup.array().notRequired(),
      }),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('applythrough', values.cvOption);
        formData.append('skills', values.skills);
        formData.append('jobVacancyID', jobVacancyID);
        formData.append('jobTitle', jobTitle);

        if (values.cvOption === 'withCV' && values.file) {
          formData.append('cv', values.file);
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
          // Show notification and do not submit the form
          setNotification('You have already applied for this job.');
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        } else {
          // Successfully applied, show success notification and navigate to /jobs
          setNotification('Successfully applied!');
          setTimeout(() => {
            setNotification(null);
            navigate('/jobs');
          }, 3000);
        }
      } catch (error) {
        // Show error notification
        setNotification(
          'There was an error submitting the application. Please try again.'
        );
        setTimeout(() => {
          setNotification(null);
        }, 3000);

        console.error('Error submitting application:', error);
      }
    },
  });

  // Render the component
  return (
    <UserLayout UserLayout>
      <UserNavBar />
      <div className="bg-gray-100 min-h-screen flex justify-center items-center dark:bg-gray-900">
        <div className="bg-white p-8 rounded shadow-md w-100 m-5 dark:bg-gray-700">
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <h1 className="text-lg font-bold dark:text-gray-400">Application Form</h1>
            {notification && (
              <div className="bg-red-500 text-white p-2 mb-4 mt-5 flex justify-between items-center">
                <span>{notification}</span>
                <button className="text-white" onClick={() => setNotification(null)}>
                  X
                </button>
              </div>
            )}
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
                  onChange={() => formik.setFieldValue('cvOption', 'withCV')}
                  checked={formik.values.cvOption === 'withCV'}
                />
                <label htmlFor="withCV">Apply with CV</label>
                <input
                  type="radio"
                  id="withoutCV"
                  name="cvOption"
                  className="ml-8 mr-2"
                  onChange={() => formik.setFieldValue('cvOption', 'withoutCV')}
                  checked={formik.values.cvOption === 'withoutCV'}
                />
                <label htmlFor="withoutCV">Apply without CV</label>
              </div>
              {formik.touched.cvOption && formik.errors.cvOption && (
                <div className="text-red-500">{formik.errors.cvOption}</div>
              )}
            </div>

            {formik.values.cvOption === 'withCV' && (
              <div className="border-2 border-dashed h-full dark:text-gray-400 my-2 md:my-4">
                <input
                  type="file"
                  id="fileInput"
                  name="cv"
                  style={{}}
                  onChange={(e) => formik.setFieldValue('file', e.target.files[0])}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="text-red-500">{formik.errors.file}</div>
                )}
              </div>
            )}

            {formik.values.cvOption === 'withoutCV' && (
              <SkillInput
                label="Skills"
                skills={formik.values.skills}
                setSkills={(skills) => formik.setFieldValue('skills', skills)}
              />
            )}
            <Button text="Apply" type="submit" />
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default ApplyforJob;
