import Button from "../components/Buttons/Button";
import Fields from "../components/Fields/Fields";
import AuthLayout from "../components/layouts/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout title="Sign Up">
      <form>
        <div className="flex justify-between w-full gap-x-2">
          <div className="w-1/2">
            <Fields label="First Name" type="text"  placeholder="Jhon" />
          </div>
          <div className="w-1/2">
            <Fields label="Last Name" type="text"  placeholder="Doe" />
          </div>
        </div>
        <Fields label="User Name" type="text"  placeholder="JhonDoe123"/>
        <Fields label="Email" type="email"  placeholder="example@gmail.com"/>
       
        <Fields
          label="Confirm Password"
          type="password"
          placeholder="Password"
        />
         <Fields
          label="Password"
          type="password"
          placeholder="Password"
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
