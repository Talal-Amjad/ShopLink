import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import UpdatePassword from "./UpdatePassword";
import axios from "../../axios";
import Fields from "../../components/Fields/Fields";
import { useFormik } from "formik";
import * as Yup from "yup";

function VerifyCode() {
  const navigate = useNavigate();
  const [isOpen, toggleModal] = useModal();
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
        const response = await axios.post("/verify_email_encoded_pass", {
          verificationCode: values.verificationCode,
        });
    
        setNotification({ type: "success", message: "Verification successful!" });
        setTimeout(() => {
          setNotification(null);
          setTimeout(() => {
            toggleModal();
          }, 500);
        }, 1000);
      } catch (error) {
        
       
          setNotification({ type: "error", message: "Invalid verification code" });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
      
       
        console.error("Error during code verification:", error.message);
      }
    },
  });

  const handleResendCode = async () => {
    // Implement resend code functionality here
  };

  return (
    <div className="bg-white dark:bg-gray-700 flex flex-col flex-wrap justify-center items-center max-w-screen h-screen overflow-hidden">
      <div className="w-auto md:w-[500px] bg-gray-100 dark:bg-gray-900 dark:text-gray-300 flex flex-col p-5 flex-wrap h-auto md:h-[500px] rounded-xl items-center">
        <h1 className="text-700 font-bold text-xl p-5 mb-5">Verify Your Email</h1>
        <p className="leading-tight text-gray-500 mb-7 text-center capitalize">
          Please Enter the Verification code That we sent to{" "}
          <span className="font-bold lowercase text-black">{}</span> in order
          to reset your password.
        </p>
        <form onSubmit={formik.handleSubmit} className="md:w-full">
          <div className="mr-4 ml-4">
          <Fields
            label="Verification Code"
            type="text"
            name="verificationCode"
            placeholder="Enter verification code"
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

        {notification && (
          <div
            className={`mt-4 p-2 rounded-md ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {notification.message}
          </div>
        )}

        <p className="mt-6 text-gray-500">
          Not Received?
          <button
            className="px-2 duration-200 font-bold text-black hover:text-gray-500"
            type="button"
            onClick={handleResendCode}
          >
            Resend Code
          </button>
        </p>
      </div>
      {isOpen && <UpdatePassword isOpen={isOpen} onClose={toggleModal} />}
    </div>
  );
}
export default VerifyCode;