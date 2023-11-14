import PropTypes from "prop-types";
import authBackgroundImage from "../../assets/images/authBackgroundImage.png";
import shopLinkLogo from "../../assets/images/ShopLinkLogo.png";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen flex bg-black">
      <div className="hidden md:flex w-1/2 hidden:overflow ">
        <img
          src={authBackgroundImage}
          alt="BackgroundImage"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-start items-center relative bg-background-gray p-6 md:py-10 md:flex md:w-1/2 dark:bg-gray-900 overflow-y-auto">
        <div className="flex justify-center items-center h-24 mb-4">
          <img
            src={shopLinkLogo}
            alt="ShopLinkLogo"
            className="object-contain"
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        </div>

        <div className="w-full max-w-lg bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 md:w-3/4">
          <div className="p-6">
            <h1 className="font-inter font-medium text-2xl text-gray-900 md:text-2xl dark:text-gray-300">
              {title}
            </h1>
            {/* To display Signin or signup form */}
            {children}
            {title === "Sign in" && (
              <div className="flex items-center justify-center p-3 ">
                <Link
                  to="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-[#4682B4]"
                >
                  Forgot password?
                </Link>
              </div>
            )}
            <p className="text-sm font-inter border-t my-4 p-4 text-[#707070] dark:text-white justify-center flex">
              {title === "Sign in"
                ? "Don't have an account yet?"
                : "Already have an account?"}
              <Link
                to={title === "Sign in" ? "/signup" : "/signin"}
                className="ml-1 font-medium text-[#4682B4] hover:underline dark:text-[#4682B4]"
              >
                {title === "Sign in" ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthLayout;
