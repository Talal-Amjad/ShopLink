import {NavLink, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import PropTypes from "prop-types";

const Sidebar = ({ sidebarVisible }) => {
  const { pathname } = useLocation();
  const sidebarOptions = [
    {
      id: 1,
      name: "Post Job",
      icon: <MdOutlineDashboard size={24} />,
      path: "/",
    },
    {
      id: 2,
      name: "Sales Insights",
      path: "/",
      icon: <CgFileDocument size={24} />,
    },
    {
      id: 3,
      name: "View All Applicants",
      path: "/",
      icon: <FiUsers size={24} />,
    },
  ];

  const isPathActive = (path) => {
    return pathname === path;
  };

  return (
    <div
      className={`fixed w-full bg-white mt-14 ${
        sidebarVisible ? "left-0" : ""
      } transition-all duration-300 w-full top-0 -left-[100%] h-screen md:w-[20%] md:left-0 dark:bg-gray-900 dark:text-gray-400 z-20`}
    >
      <div className="p-4">
        {/* Sidebar Options */}
        <div className="space-y-4">
          {sidebarOptions.map((option) => (
            <div key={option.id}>
              <div
                className={`navItem flex items-center space-x-4 py-2 md:py-4 md:px-2`}
              >
                <div>{option.icon}</div>
                <NavLink
                  to={option.path || "#"}
                  className="flex w-full justify-between"
                >
                  {option.name}
                </NavLink>
              </div>
            </div>
          ))}
          <hr />
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired,
};

export default Sidebar;
