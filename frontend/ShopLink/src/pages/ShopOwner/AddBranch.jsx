import Button from "../../components/Buttons/Button";
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import Swal from 'sweetalert2';
import Modal from "../../components/Modal/Modal";
import Buttons from "../../components/Buttons/Button";
function AddBranch({ onClose, isOpen }) {
  const [notification, setNotification] = useState('');
  const [managerUsernames, setManagerUsernames] = useState([]);

  useEffect(() => {
    // Fetch manager usernames when component mounts
    const fetchManagerUsernames = async () => {
      try {
        const response = await axios.get('/managersusername');
        setManagerUsernames(response.data);
      } catch (error) {
        console.error('Error fetching manager usernames:', error);
      }
    };
    fetchManagerUsernames();
  }, []);

  const validationSchema = Yup.object().shape({
    branchcode: Yup.number().min(1001, 'Branch code must be greater than 1000').required('Branch code is required'),
    managerusername: Yup.string().required('Manager username is required'),
    city: Yup.string().required('City is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/addbranch', values);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message
      });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.error
        });
      } else {
        console.error('Error adding branch:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Internal server error'
        });
      }
    }
    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="font-manrope font-semibold text-xl leading-[32.78px] text-[#191D23] mb-2 mx-6 dark:text-gray-400">
        Add Branch
      </h1>
      <hr className="m-4" />
      <Formik
        initialValues={{
          branchcode: '',
          managerusername: '',
          city: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mx-6">
            <h1 className="font-manrope font-semibold mx-0 text-l leading-[32.78px] text-[#191D23] mb-2 dark:text-gray-400">
              Branch Code / Branch Id
            </h1>
            <Field
              name="branchcode"
              type="number"
              placeholder="Branch Code"
              className="border-gray-300 border p-2 rounded-md w-full"
            />
            <ErrorMessage name="branchcode" component="div" className="text-red-500" />

            <h1 className="font-manrope font-semibold mx-0 text-l leading-[32.78px] text-[#191D23] mb-2 dark:text-gray-400">
              Manager Username
            </h1>
            {/* Dropdown for manager usernames */}
            <Field
              name="managerusername"
              as="select"
              className="border-gray-300 border p-2 rounded-md w-full"
            >
              <option value="">Select Manager Username</option>
              {managerUsernames.map((username, index) => (
                <option key={index} value={username}>{username}</option>
              ))}
            </Field>
            <ErrorMessage name="managerusername" component="div" className="text-red-500" />

            <h1 className="font-manrope font-semibold mx-0 text-l leading-[32.78px] text-[#191D23] mb-2 dark:text-gray-400">
              City
            </h1>
            <Field
              name="city"
              type="text"
              placeholder="City"
              className="border-gray-300 border p-2 rounded-md w-full"
            />
            <ErrorMessage name="city" component="div" className="text-red-500" />

            {notification && <div className="text-red-500">{notification}</div>}
            <hr className="mt-10 mb-4 mx-0" />
            <div className="flex justify-between mb-2">
              <Buttons
                type="button"
                text="Close"
                onClick={onClose}
                bgColor="none"
              />
              <div className="mx-2"></div>
              <Button
                type="submit"
                text="Add Branch"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
      </Modal>
  );
}

export default AddBranch;
