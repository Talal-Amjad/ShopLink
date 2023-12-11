import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import Fields from '../../components/Fields/Fields';
import Button from '../../components/Buttons/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

export default function VerifyEmail({ isOpen, onClose }) {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").matches(/.*@(gmail\.com|.*\.edu\.pk)$/, "Email must be a Gmail address or end with .edu.pk").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/verif_foretpass_email', {
          email: values.email,
        });

        if (response.status === 200) {
          showNotification('Verification successful!', 'success');
          setTimeout(() => {
            navigate('/verifycode');
          }, 1000);
        }
      } catch (error) {
        if (error.response.status === 404) {
          showNotification('Email not registered', 'error');
        } else {
          console.error('Error during email verification:', error.message);
        }
      }
    },
  });

  useEffect(() => {
    // Cleanup notification when the component unmounts
    return () => {
      setNotification(null);
    };
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-md">
        <h1 className="font-medium text-[24px] leading-34 text-[#353535] h-9 mb-2 dark:text-gray-400">
          Verify Your Email
        </h1>
        {notification && (
          <div
            className={`mt-3 p-2 text-white mb-3 flex justify-between ${
              notification.type === 'success'
                ? 'bg-green-500'
                : 'bg-red-500'
            }`}
          >
            <span>{notification.message}</span>
            <button className="text-right" onClick={() => setNotification(null)}>
              X
            </button>
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Fields
            label="Email address"
            type="email"
            name="email"
            value={formik.values.email}
            placeholder="example@gmail.com"
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
          />
          <Button type="submit" text="Verify Email" />
        </form>
        <button
          className="w-full py-2 rounded-md outline-none text-primary dark:text-white"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
