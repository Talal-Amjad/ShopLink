import { useState, useEffect } from 'react';
import axios from '../../axios';
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import Notifications from '../../pages/Notifications';
import { jwtDecode } from 'jwt-decode';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const [isOpen, toggleModal] = useModal();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadNotificationCount();
  }, []);

  const fetchUnreadNotificationCount = async () => {
    try {
      const response = await axios.get('/unreadNotificationCount', {
        params: { username, role } // Sending username and role as query parameters
    });
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching unread notification count:', error);
    }
  };

  const handleNotificationClick = async () => {
    try {
        await axios.put('/markNotificationsAsRead', null, {
            params: { username, role } 
        });
        fetchUnreadNotificationCount();
        toggleModal();
    } catch (error) {
        console.error('Error marking notifications as read:', error);
    }
};


  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  const username = decodedToken.username;
 
  return (
    <header className="bg-white fixed w-full h-24 flex justify-between items-center transition-all duration-[400ms] z-40 p-4 dark:bg-gray-900 text-gray-400">
      <div className="hidden logo ml-5 font-bold text-3xl text-primary md:block">
        S<span className="ml-1 tracking-tighter">H</span>
        <span className="ml-1 tracking-tighter">O</span>
        <span className="ml-1 tracking-tighter">P</span>
        <span className="ml-1 tracking-tighter">L</span>
        <span className="ml-1 tracking-tighter">I</span>
        <span className="ml-1 tracking-tighter">N</span>
        <span className="ml-1 tracking-tighter">K</span>
      </div>
      <svg
        className="block cursor-pointer md:hidden stroke-[#333333] dark:stroke-gray-400"
        width="31"
        height="20"
        viewBox="0 0 21 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={toggleSidebar}
      >
        <path d="M1 1H19" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M7.49219 6.76953H19.0022"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          className="stroke-[#007684]"
          d="M1 6.76953H3.99"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M1 12.5391H19" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="header-right flex items-center mr-2 md:mr-8">
        <div className="search flex items-center mr-2 px-2 py-1 rounded-md bg-gray-300">
          <FaSearch className="search-icon text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="hidden border-none px-2 outline-none bg-gray-300 md:block"
          />
        </div>
        {/* Notification */}
        <div className="relative cursor-pointer" onClick={handleNotificationClick}>
        <svg className="w-8 h-8 text-primary animate-wiggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"/></svg>
          {unreadCount > 0 && (
            <div className="px-1 bg-primary rounded-full text-center text-white text-sm absolute -top-3 -end-2">
              {unreadCount}
              <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></div>
            </div>
          )}
        </div>
      </div>
      {isOpen && <Notifications isOpen={isOpen} onClose={toggleModal} />}
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func,
};

export default Header;
