import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Fields from "../components/Fields/Fields";
import Button from "../components/Buttons/Button";
import axios from "./../axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const nameValidationRegex = /^[A-Za-z ]+$/;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .matches(nameValidationRegex, "First name cannot contain numeric values")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .matches(nameValidationRegex, "Last name cannot contain numeric values")
    .required("Last name is required"),
    username: Yup.string().min(5, "Username must be at least 5 characters").required("Username is required"),
    email: Yup.string().email("Invalid email address").matches(/.*@(gmail\.com|.*\.edu\.pk)$/, "Email must be a Gmail address or end with .edu.pk").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/signup", values);
        const message = response.data.successMsg;
        console.log(message);
        navigate("/emailverification");
      } catch (error) {
        console.log(error);
        handleSignUpError(error);
      }
    },
  });

  const handleSignUpError = (error) => {
    const errorMessage = error.response?.data?.error || "An error occurred";
    setError(errorMessage);
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
      setError("");
    }, 5000);
  };

  return (
    <AuthLayout title="Sign Up">
      {showError && (
        <div className="bg-red-500 text-white p-3 my-5 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setShowError(false)}>&times;</button>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between w-full gap-x-2">
          <div className="w-1/2">
            <Fields
              label="First Name"
              type="text"
              name="firstName"
              placeholder="Jhon"
              value={formik.values.firstName}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              error={formik.touched.firstName && formik.errors.firstName}
            />
          </div>
          <div className="w-1/2">
            <Fields
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Doe"
              value={formik.values.lastName}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              error={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
        </div>
        <Fields
          label="User Name"
          type="text"
          name="username"
          placeholder="JhonDoe123"
          value={formik.values.username}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          error={formik.touched.username && formik.errors.username}
        />

        <Fields
          label="Email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={formik.values.email}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
        />
        <Fields
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
        />
        <Fields
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Password"
          value={formik.values.confirmPassword}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <div>
          <Button text="Create account" type="submit" />
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;
