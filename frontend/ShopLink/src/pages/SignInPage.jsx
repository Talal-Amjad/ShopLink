import { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Fields from "../components/Fields/Fields";
import Button from "../components/Buttons/Button";


const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  //When the API is available we will use Yup and formik for validation.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
        navigate("/signin");
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
          label="Email address"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        
          <Fields
            label="Password"
            type="password"
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
