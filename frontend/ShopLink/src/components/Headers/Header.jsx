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
  
      </div>
      {isOpen && <Notifications isOpen={isOpen} onClose={toggleModal} />}
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func,
};

export default Header;
