import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "./../axios";


function EmailVerification() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerify = async () => {
    try {
      const response = await axios.post("/verify", {verificationCode});
      if (response.status === 200) {
        console.log(response);
        alert(response.data.successMsg);
          navigate("/signin");
      }
    } catch (error) {
      console.log(error.response.data.ErrorMsg);
      alert(error.response.data.ErrorMsg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificationCode !== "") {
      handleVerify();
    }
  };



  return (
    <div className="flex flex-col flex-wrap justify-center items-center max-w-screen h-screen overflow-hidden">
      <div
        style={{}}
        className="md:w-[450px] bgForm flex flex-col p-5 flex-wrap h-96  rounded-xl items-center"
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
          className="outline-none px-2 py-1 w-[70%] mb-2 border-b-2 border-r-2 border-gray-400"
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
            className=" px-2 duration-200 font-bold text-black hover:text-gray-500"
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
