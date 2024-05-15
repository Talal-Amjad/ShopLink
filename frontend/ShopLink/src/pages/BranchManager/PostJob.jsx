import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import Fields from '../../components/Fields/Fields';
import Button from '../../components/Buttons/Button';
import ManagerDashboardLayout from '../../components/layouts/BranchManager/managerDashboardLayout';
import SkillInput from '../../components/Fields/SkillInput';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [skills, setSkills] = useState([]);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    jobTitle: Yup.string()
      .min(5, 'Job Title must be at least 5 characters')
      .matches(/^[A-Za-z\s]+$/, 'Job Title cannot contain numeric values')
      .required('Job Title is required'),
    salary: Yup.number()
      .min(5000, 'Expected Salary must be greater than or equal to 5000')
      .required('Expected Salary is required'),
    description: Yup.string()
      .min(30, 'Job Description must be at least 30 characters')
      .required('Job Description is required'),
    experience: Yup.string().required('Job Experience is required'),
    date: Yup.date()
      .min(
        new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        'Last Date to Apply should be at least the next day'
      )
      .required('Last Date to Apply is required'),
    skills: Yup.array().min(3, 'At least 3 skills are required'),
  });

  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      salary: '',
      experience: '',
      description: '',
      date: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      const username = decodedToken.username;

      const value = {
        jobTitle: values.jobTitle,
        expectedSalary: values.salary,
        jobDescription: values.description,
        experience: values.experience,
        lastDate: values.date,
        skills,
      };
      try {
        await axios.post('/postjob', value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotification('Job Post request submitted Successfully');
        setNotificationType('success');
        formik.resetForm();
        setSkills([]);
        navigate(-1);

        axios
          .post('/savepostjobnotification', {
            jobTitle: values.jobTitle,
            title: 'New job Posted',
            username: username,
            status: 'unread',
          })
          .then((response) => {
            // Existing code remains the same
          })
          .catch((error) =>
            console.error('Error updating job status:', error)
          );
      } catch (error) {
        setNotification(`Error in Job Post request: ${error.message}`);
        setNotificationType('error');
        console.error('Error in Job Post request:', error);
      }

      // Clear notification after 2 seconds
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 2000);
    },
  });

  return (
    <ManagerDashboardLayout>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center dark:bg-gray-700">
        <div className="max-w-6xl w-full bg-white p-8 relative m-10 shadow-md dark:bg-gray-900 border-4 rounded-lg">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-2xl font-bold dark:text-gray-400 mb-4">
              Job Details Form
            </h1>
            <hr className="border-gray-200 w-full mt-4 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Fields
                label="Job Title"
                type="text"
                name="jobTitle"
                placeholder="Manager"
                value={formik.values.jobTitle}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                error={formik.touched.jobTitle && formik.errors.jobTitle}
              />
              <Fields
                label="Expected Salary"
                type="number"
                name="salary"
                placeholder="10000"
                value={formik.values.salary}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                error={formik.touched.salary && formik.errors.salary}
              />
              <Fields
                label="Experience"
                type="text"
                name="experience"
                placeholder="Enter experience"
                value={formik.values.experience}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                error={formik.touched.experience && formik.errors.experience}
              />
              <Fields
                label="Last Date to Apply"
                type="date"
                name="date"
                value={formik.values.date}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                error={formik.touched.date && formik.errors.date}
              />
            </div>
            <div className="md:w-1/2">
              <SkillInput
                label="Skills"
                skills={skills}
                setSkills={setSkills}
              />
            </div>
            <Fields
              label="Job Description"
              type="textarea"
              name="description"
              placeholder="Details about job"
              value={formik.values.description}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              error={formik.touched.description && formik.errors.description}
            />
            <div className="mt-4">
              <hr className="border-gray-200 w-full mt-4 mb-4" />
              <div className="w-44">
                <Button text="Post Job" type="submit" />
              </div>
            </div>
          </form>
          {notification && (
            <div
              className={`mt-4 p-4 rounded ${
                notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white flex justify-between items-center`}
            >
              <span>{notification}</span>
              <button
                className="text-white"
                onClick={() => setNotification(null)}
              >
                X
              </button>
            </div>
          )}
        </div>
      </div>
    </ManagerDashboardLayout>
  );
};

export default PostJob;
