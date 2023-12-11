import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "./../axios";
import Fields from "../components/Fields/Fields";

function EmailVerification() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const validationSchema = Yup.object().shape({
    verificationCode: Yup.string().required("Verification code is required"),
  });

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/verify", { verificationCode: values.verificationCode });
        if (response.status === 200) {
          setNotification({ type: "success", message: response.data.successMsg });
          setTimeout(() => {
            setNotification(null);
            navigate("/signin");
          }, 1000);
        }
      } catch (error) {
        setNotification({ type: "error", message: error.response.data.ErrorMsg });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    },
  });

  useEffect(() => {
    // Automatically close success notification after 1 second
    if (notification && notification.type === "success") {
      const timer = setTimeout(() => {
        setNotification(null);
        navigate("/signin");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notification, navigate]);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="bg-white dark:bg-gray-700 flex flex-col flex-wrap justify-center items-center max-w-screen h-screen overflow-hidden">
      <div className="w-auto md:w-[500px] bg-gray-100 dark:bg-gray-900 dark:text-gray-300 flex flex-col p-5 flex-wrap h-auto md:h-[500px] rounded-xl items-center">
        <h1 className="text-700 font-bold text-xl p-5 mb-5">
          Verify Your Account
        </h1>
        {notification && (
          <div
            className={`mt-2 p-3 mr-4 mb-5 rounded-md md:w-full ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white flex justify-between items-center`}
          >
            {notification.message}
            <button
              className="ml-2 text-white font-bold"
              onClick={handleCloseNotification}
            >
              x
            </button>
          </div>
        )}
        <p className="leading-tight text-gray-500 mb-7 text-center capitalize">
          Please Enter the Verification code That we sent to{" "}
          <span className="font-bold lowercase text-black">{}</span> in order
          to activate your account.
        </p>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mr-4 ml-4">
            <Fields
              label="Verification Code"
              type="text"
              name="verificationCode"
              value={formik.values.verificationCode}
              handleChange={formik.handleChange}
              error={formik.touched.verificationCode && formik.errors.verificationCode}
            />
            <button
              className="bg-primary w-full mr-6 md:w-full py-2 md:mt-[20px] cursor-pointer text-white hover:bg-primary duration-200 ease-in-out rounded-sm"
              type="submit"
            >
              Verify
            </button>
          </div>
        </form>
        <p className="mt-6 text-gray-500">
          Not Received?
          <button
            className="px-2 duration-200 font-bold text-black hover:text-gray-500"
            type="submit"
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
}

export default EmailVerification;
