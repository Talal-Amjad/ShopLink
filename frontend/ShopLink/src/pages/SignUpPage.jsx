import Button from "../components/Buttons/Button";
import Fields from "../components/Fields/Fields";
import AuthLayout from "../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from './../axios'


const SignUpPage = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");


  //When the API is available we will use Yup and formik for validation.

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (username && password && confirmPassword && email && lastName && firstName) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post('/signup', {
            firstname: firstName,
            lastname: lastName,
            username,
            email,
            password,
            role: role,
          });
  
          const message = response.data.successMsg;
          console.log(message);
          if(message==="User Created!"){
            navigate("/manager");
          }
        } catch (error) {
          console.log(error);
          alert(error.response?.data?.error || 'An error occurred');
          setError(error.response?.data?.error || 'An error occurred');
          return;
        }
      } else {
        setError("Password and Confirm not the same");
      }
    } else {
      setError('All fields are required');
      return;
    }
  };
  



  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between w-full gap-x-2">
          <div className="w-1/2">
            <Fields label="First Name" type="text" name="firstname"  placeholder="Jhon" value={firstName}
            handleChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="w-1/2">
            <Fields label="Last Name" type="text" name="lastname"  placeholder="Doe" value={lastName}
            handleChange={(e) => setLastName(e.target.value)}/>
          </div>
        </div>
        <Fields label="User Name" type="text" name="username" placeholder="JhonDoe123" value={username}
        handleChange={(e) => setUsername(e.target.value)}/>
        <Fields label="Email" type="email" name="email" placeholder="example@gmail.com" value={email}
        handleChange={(e) => setEmail(e.target.value)}/>
        <Fields
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          handleChange={(e) => setPassword(e.target.value)}
        />
        <Fields
          label="Confirm Password"
          type="password"
          placeholder="Password"
          value={confirmPassword}
          handleChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          <Button text="Create account" type="submit" />
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

export default SignUpPage;
