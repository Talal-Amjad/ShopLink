import {NavLink, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import PropTypes from "prop-types";
import Logout from "../../../assets/images/Logout.png"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

const OwnerBar = ({ sidebarVisible }) => {
  const { pathname } = useLocation();

  const navigate=useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    Swal.fire({
      title: "Done!",
      text: "Logged Out Successfully.",
      icon: "success"
    });
    console.log("Token has been Removed");
    navigate('/signin');

  };

  const sidebarOptions = [
    {
      id: 1,
      name: "Approve Job",
      icon: <MdOutlineDashboard size={24} />,
      path: "/approvejob",
    },
    {
      id: 2,
      name: "Sales Insights",
      path: "/owner",
      icon: <CgFileDocument size={24} />,
    },
    {
      id: 3,
      name: "View All Applicants",
      path: "/ownerviewallapplicants",
      icon: <FiUsers size={24} />,
    },
  ];

  const isPathActive = (path) => {
    return pathname === path;
  };

  return (
    <div
      className={`fixed w-full bg-white mt-[120px]${
        sidebarVisible ? "left-0" : ""
      } transition-all duration-300 w-full top-0 -left-[100%] h-screen md:w-[20%] md:left-0 dark:bg-gray-900 dark:text-gray-400 z-20`}
    >
      <div className="p-4">
        {/* Sidebar Options */}
        <div className="space-y-4">
          {sidebarOptions.map((option) => (
            <div key={option.id}>
              <div
                className={`navItem flex items-center space-x-4 py-2 md:py-4 md:px-2  hover:bg-[#5893c4] hover:rounded-md hover:text-white`}
              >
                <div>{option.icon}</div>
                <NavLink
                  to={option.path || "#"}
                  className="flex w-full lg:text-[18px]  justify-between"
                >
                  {option.name}
                </NavLink>
              </div>
            </div>
          ))}
          <hr />
        </div>
      </div>
      <div className="fixed bottom-0 flex items-center ml-2 mb-5 font-sans text-black dark:text-gray-400">
          <span className="mr-4">
            <img src={Logout} className="h-10 w-10 ml-4 cursor-pointer" onClick={handleLogout}
            />
          </span>
          <button className="flex items-center text-xl bg-none border-none cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>
    </div>
  );
};

OwnerBar.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired,
};

export default OwnerBar;
