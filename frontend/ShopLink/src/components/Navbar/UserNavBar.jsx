import { useState } from 'react';
import { FaSearch, FaBars,FaSignOutAlt } from 'react-icons/fa';
import Logo from '../../assets/images/ShopLinkLogo.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const UserNavBar = ({ onSearch }) => {
 
  const [searchInput, setSearchInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();


  const handleLogout = () => {
    Swal.fire({
      title: 'Done!',
      text: 'Logged Out Successfully.',
      icon: 'success',
    });
    localStorage.removeItem('token');
    console.log('Token has been Removed');
    navigate('/signin');
  };

  const handleJobs = () => {
    navigate('/jobs');
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    onSearch(inputValue);
  };

  return (
    <header className="bg-white fixed w-full h-24 flex justify-between items-center transition-all duration-[400ms] z-40 p-4 dark:bg-gray-900 text-gray-400">
      <div className="logo ml-5 font-bold text-3xl text-primary hidden md:flex">
        <img src={Logo} className="h-[130px] w-[100px]" alt="Logo" />
        <span className="ml-2 mt-10">SHOPLINK</span>
      </div>

      <div className="menu-icon md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars className="text-3xl" />
      </div>

      <div className={`header-right ${menuOpen ? 'block' : 'hidden'} md:flex md:items-center md:mr-8`}>
        <div className="search flex items-center p-2 rounded-md bg-gray-300 m-3 mb-4">
          <FaSearch className="search-icon text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="border-none px-1 py-1 outline-none bg-gray-300 text-black md:block w-full"
          />
         
        </div>

          <div className="filter flex items-center font-sans text-primary dark:text-gray-400 border-primary border-solid border-4 px-4 py-2 rounded hover:bg-primary hover:text-white" onClick={handleLogout}>
          <span>
           <FaSignOutAlt  size={30}/>
          </span>
          <button className="flex items-center text-xl mr-2 bg-none border-none cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserNavBar;
