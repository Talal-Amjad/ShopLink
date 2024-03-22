import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Buttons/Button";

function UpdateBranch({ branchId, initialValues, onClose, isOpen }) {
  const [notification, setNotification] = useState('');

  const validationSchema = Yup.object().shape({
    managerUsername: Yup.string().required('Manager username is required'),
    city: Yup.string().required('City is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Make API call to update branch details
      await axios.put(`/updatebranch/${branchId}`, values);
      setSubmitting(false);
      onClose(); // Close the modal after successful submission
      // Show success message using Swal or any other library
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Branch details updated successfully'
      });
    } catch (error) {
      console.error('Error updating branch:', error);
      setNotification('Error updating branch. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="font-manrope font-semibold text-xl leading-[32.78px] text-[#191D23] mb-2 mx-6 dark:text-gray-400">
        Update Branch Details
      </h1>
      <hr className="m-4" />
      <Formik
        initialValues={initialValues}
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
              type="text"
              placeholder="Branch Code"
              className="border-gray-300 border p-2 rounded-md w-full"
              disabled
            />
            <ErrorMessage name="branchId" component="div" className="text-red-500" />

            <h1 className="font-manrope font-semibold mx-0 text-l leading-[32.78px] text-[#191D23] mb-2 dark:text-gray-400">
              Manager Username
            </h1>
            <Field
              name="managerUsername"
              type="text"
              placeholder="Manager Username"
              className="border-gray-300 border p-2 rounded-md w-full"
            />
            <ErrorMessage name="managerUsername" component="div" className="text-red-500" />

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
