import { FaSearch, FaFilter } from 'react-icons/fa';
import PropTypes from "prop-types";
const Header = ({ toggleSidebar }) => {
 
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
        <div className="filter flex items-center ml-2 font-sans text-black dark:text-gray-400">
          <span className="filter-icon mr-1">
            <FaFilter className="filter-icon-inner" />
          </span>
          <button className="hidden md:flex items-center bg-none border-none cursor-pointer">
            Filter
          </button>
        </div>
      </div>
    
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func,
};

export default Header;
