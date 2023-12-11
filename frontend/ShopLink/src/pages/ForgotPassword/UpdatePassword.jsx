import React from 'react';
import Modal from '../../components/Modal/Modal';
import Fields from '../../components/Fields/Fields';
import Button from '../../components/Buttons/Button';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function UpdatePassword({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [notification, setNotification] = React.useState(null);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        'Password must contain at least one special character'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.password !== values.confirmPassword) {
          // Remove the alert statement for password mismatch
          return;
        }

        await axios.post('/changepass', {
          pass: values.password,
        });

        // Show success notification for 1.5 seconds
        setNotification({
          type: 'success',
          message: 'Password updated successfully!',
        });

        setTimeout(() => {
          // Hide success notification after 1.5 seconds
          setNotification(null);
          onClose();
          navigate('/signin');
        }, 1500);
      } catch (error) {
        console.error('Error during password update:', error.message);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-md">
        <h1 className="font-medium text-[24px] leading-34 text-[#353535] h-9 mb-2 dark:text-gray-400">
          Update Your Password
        </h1>
        {notification && (
            <div
              className={`mt-4 p-2 rounded-md bg-green-500 text-white`}
            >
              {notification.message}
            </div>
          )}
        <form onSubmit={formik.handleSubmit}>
          <Fields
            label="New Password"
            type="password"
            name="password"
            value={formik.values.password}
            placeholder=""
            handleChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
          />
          <Fields
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            placeholder=""
            handleChange={formik.handleChange}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button type="submit" text="Update Password" />
          <button
            className="w-full py-2 rounded-md outline-none text-primary dark:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
}
