import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Buttons/Button";
import Swal from 'sweetalert2';

function UpdateBranch({ onClose, isOpen, branch }) {
  const [managerUsernames, setManagerUsernames] = useState([]);

  useEffect(() => {
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
    managerusername: Yup.string().required('Manager username is required'),
    city: Yup.string().required('City is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { branchId, managerusername, city } = values;
      const response = await axios.put(`/updatebranches/${branchId}`, { managerusername, city });
      
      if (response.data.success) {
        if (response.data.alreadyAppointed) {
          // Show Swal for already appointed manager
          Swal.fire({
            icon: 'error',
            title: 'Manager Already Appointed',
            text: 'This manager is already appointed to another branch.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        } else {
          // Show Swal for successful update
          Swal.fire({
            icon: 'success',
            title: 'Branch Updated',
            text: 'Branch details have been successfully updated.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              onClose();
            }
          });
        }
      } else {
        // Show Swal for error updating branch
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error updating branch. Please try again.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
      setSubmitting(false);
    } catch (error) {
      console.error('Error updating branch:', error);
      // Show Swal for error updating branch
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Manager Already Appionted on another Branch.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      setSubmitting(false);
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="font-manrope font-semibold text-xl leading-[32.78px] text-[#191D23] mb-2 mx-6 dark:text-gray-400">
        Update Branch Details
      </h1>
      <hr className="m-4" />
      <Formik
        initialValues={{
          branchId: branch?.branchId || '',
          managerusername: branch?.managerUsername || '',
          city: branch?.city || ''
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
              name="branchId"
              type="number"
              placeholder="Branch ID"
              className="border-gray-300 border p-2 rounded-md w-full"
              readOnly
            />
            <h1 className="font-manrope font-semibold mx-0 text-l leading-[32.78px] text-[#191D23] mb-2 dark:text-gray-400">
              Manager Username
            </h1>
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

            <hr className="mt-10 mb-4 mx-0" />
            <div className="flex justify-between mb-2">
              <Button
                type="button"
                text="Close"
                onClick={onClose}
                bgColor="none"
              />
              <div className="mx-2"></div>
              <Button
                type="submit"
                text="Update Branch"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default UpdateBranch;
