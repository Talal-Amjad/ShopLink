import { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const UserNavBar = ({ onSearch }) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchIconClick = () => {
    setIsSearchBarOpen((prev) => !prev);
    if (!isSearchBarOpen) {
      onSearch(searchInput); // Trigger search when the icon is clicked
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchOnEnter = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchInput); // Trigger search when Enter key is pressed
    }
  };


  return (
    <header className="bg-white fixed w-full h-18 flex justify-between items-center transition-all duration-[400ms] z-40 p-4 dark:bg-gray-900 text-gray-400">
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
        <div className={`search flex items-center mr-2 px-2 py-1 rounded-md bg-gray-300 ${isSearchBarOpen ? 'active' : ''}`}>
            <FaSearch className="search-icon text-gray-500" onClick={handleSearchIconClick} />
            <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchOnEnter}
                className={`border-none px-2 outline-none bg-gray-300 md:block ${isSearchBarOpen ? 'block' : 'hidden'}`}
            />
        </div>
      </div>
    </header>
  );
};

export default UserNavBar;
