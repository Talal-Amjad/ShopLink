import { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import Logo from '../../assets/images/ShopLinkLogo.png';
import Logout from '../../assets/images/Logout.png';
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
          <span className="ml-2 mt-10">
            S</span>
            <span className="ml-1 mt-10 tracking-tighter">H</span>
            <span className="ml-1 mt-10 tracking-tighter">O</span>
            <span className="ml-1 mt-10 tracking-tighter">P</span>
            <span className="ml-1 mt-10 tracking-tighter">L</span>
            <span className="ml-1 mt-10 tracking-tighter">I</span>
            <span className="ml-1 mt-10 tracking-tighter">N</span>
            <span className="ml-1 mt-10 tracking-tighter">K</span>
          
      </div>

         <button className="flex items-center text-xl text-black bg-none border-none cursor-pointer" onClick={handleJobs}>
            Jobs
          </button>
      <div className="menu-icon md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars className="text-3xl" />
      </div>
      <div className={`header-right flex items-center flex-col ${menuOpen ? 'flex' : 'hidden'} md:flex md:items-center md:mr-8`}>

        <div className="search flex items-center md:mr-[120px] px-2 py-2 rounded-md bg-gray-300 mb-4">
          <FaSearch className="search-icon text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="border-none px-1 py-1 outline-none bg-gray-300 text-black md:block w-full"
          />
        </div>

        <div className="fixed right-0 flex items-center ml-2 mb-5 font-sans text-black dark:text-gray-400">
          <span className="mr-1">
            <img src={Logout} className="h-10 w-10 ml-4 cursor-pointer" onClick={handleLogout} alt="Logout" />
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
