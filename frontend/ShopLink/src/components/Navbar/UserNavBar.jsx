import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const UserNavBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    onSearch(inputValue); 
  };

  return (
    <header className="bg-white fixed w-full h-24 flex justify-between items-center transition-all duration-[400ms] z-40 p-4 dark:bg-gray-900 text-gray-400">
      <div className="hidden logo ml-5 font-bold text-2xl text-primary md:block">
        S
        <span className="ml-1 tracking-tighter">H</span>
        <span className="ml-1 tracking-tighter">O</span>
        <span className="ml-1 tracking-tighter">P</span>
        <span className="ml-1 tracking-tighter">L</span>
        <span className="ml-1 tracking-tighter">I</span>
        <span className="ml-1 tracking-tighter">N</span>
        <span className="ml-1 tracking-tighter">K</span>
       
      </div>

      <div className="header-right flex items-center mr-2 md:mr-8">
        <div className="search flex items-center mr-2 px-2 py-2 rounded-md bg-gray-300">
          <FaSearch className="search-icon text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="border-none px-1 py-1 outline-none bg-gray-300 md:block"
            style={{ width: '300px' }} 
          />
        </div>
      </div>
    </header>
  );
};

export default UserNavBar;
