import { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Fields from "../components/Fields/Fields";
import Button from "../components/Buttons/Button";
import axios from "./../axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";



const SignInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleOauthLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    const oauthToken = credentialResponse.credential;
    console.log(oauthToken);
  };

  //When the API is available we will use Yup and formik for validation.

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await axios.post("/signin", { username, password });
        const message = response.data.successMsg;
        console.log(message);
        if (message == "User Found") {
          navigate("/manager");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.error);
        setError(error.response.data.error);
        return;
      }
    } else {
      setError("All fields are required");
      return;
    }
  };

  return (
    <AuthLayout title="Sign in">
      <form className="md:space-y-1" onSubmit={handleSubmit}>
        <Fields
          label="username"
          type="text"
          name="username"
          placeholder="example@gmail.com"
          value={username}
          handleChange={(e) => setUsername(e.target.value)}
        />

        <Fields
          label="password"
          type="password"
          name="password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />

        {error && <small className="text-red-500 p-0 m-0">{error}</small>}
        <div>
          <Button type="submit" text="Continue" onClick={handleSubmit} />
        </div>
        <div class="flex items-center justify-center dark:bg-gray-800">
          <GoogleOAuthProvider clientId="361413209393-0ljmclk0444d05j5soep99ugj62uh1qj.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleOauthLogin}
              onError={() => {
                console.log("Login Failed");
              }}
              cookiePolicy="single_host_origin"
            />
          </GoogleOAuthProvider>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
