import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import UpdatePassword from "./UpdatePassword";
import axios from "../../axios";

function VerifyCode() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [isOpen, toggleModal] = useModal();

  const handleSubmit = async () => {
    try {
     
      await axios.post("/verify_email_encoded_pass", {
        verificationCode,
      });
      alert("Verification successful!");
      toggleModal();
    } catch (error) {
      console.error("Error during code verification:", error.message);
      
    }
  };

  const handleResendCode = async () => {};

  return (
    <div className="bg-white dark:bg-gray-700 flex flex-col flex-wrap justify-center items-center max-w-screen h-screen overflow-hidden">
      <div
        style={{}}
        className="md:w-[450px] bg-gray-600  dark:bg-gray-900 bg-transparent  dark:text-gray-300 flex flex-col p-5 flex-wrap h-96  rounded-xl items-center"
      >
        <h1 className="text-700 font-bold text-xl p-5 mb-5">
          Verify Your Account
        </h1>
        <p className="leading-tight text-gray-500 mb-7 text-center capitalize">
          Please Enter the Verification code That we sent to{" "}
          <span className="font-bold lowercase text-black">{}</span> in
          order to activate your account.
        </p>
        <input
          type="text"
          required
          value={verificationCode}
          onChange={(e) => {
            setVerificationCode(e.target.value);
          }}
          className="outline-none px-2 py-1 w-[70%] mb-2 border-b-2 border-r-2 border-gray-400 dark:bg-gray-700 dark:text-gray300"
        />
        <button
          className="bg-primary w-32 py-1 cursor-pointer text-white m-2 hover:bg-primary duration-200 ease-in-out rounded-sm"
          onClick={handleSubmit}
        >
          Verify
        </button>
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
