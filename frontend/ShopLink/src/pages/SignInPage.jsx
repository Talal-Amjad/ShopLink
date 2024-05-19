import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Fields from "../components/Fields/Fields";
import Button from "../components/Buttons/Button";
import axios from "./../axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/signin", values);
        const message = response.data.successMsg;
        const role = response.data.role;

        if (message === "User Found") {
          localStorage.setItem("token", response.data.token);
          if (role === "user") {
            navigate("/jobs");
          } else if (role === "manager") {
            navigate("/postedjobs");
          } else if (role === "owner") {
            navigate("/approvejob");
          }
        }
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.error || "An error occurred");
        setShowError(true);
      }
    },
  });

  const handleOauthLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    const oauthToken = credentialResponse.credential;
    console.log(oauthToken);
  };

  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false);
        setError("");
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showError]);

  const closeError = () => {
    setShowError(false);
    setError("");
  };

  return (
    <AuthLayout title="Sign in">
      {showError && (
        <div className="bg-red-500 text-white p-3 my-5 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={closeError}>&times;</button>
        </div>
      )}
      <form className="md:space-y-1" onSubmit={formik.handleSubmit}>
        <Fields
          label="Username"
          type="text"
          name="username"
          placeholder="user123"
          value={formik.values.username}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          error={formik.touched.username && formik.errors.username}
        />
        <Fields
          label="Password"
          type="password"
          name="password" 
          placeholder="********"
          value={formik.values.password}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
        />

        <div>
          <Button type="submit" text="Continue" />
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
