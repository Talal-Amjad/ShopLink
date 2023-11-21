import { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Fields from "../components/Fields/Fields";
import Button from "../components/Buttons/Button";
import axios from "./../axios";


const SignInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  //When the API is available we will use Yup and formik for validation.

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await axios.post('/signin', {username, password},);
        const message = response.data.successMsg;
        console.log(message);
        if(message == "User Found"){
          navigate("/manager");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.error)
        setError(error.response.data.error)
        return;
      }
      
    }
    else{
      setError('All fields are required')
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
          <Button
            type="submit"
            text="Continue"
            onClick={handleSubmit}
          
          />
        </div>
              <div class="flex items-center justify-center dark:bg-gray-800">
          <button class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
              <span>Login with Google</span>
          </button>
               </div>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
