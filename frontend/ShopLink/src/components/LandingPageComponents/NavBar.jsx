import React from 'react';
import logo from './../../assets/images/ShopLinkLogo.png';

export default function NavBar() {
  const logoStyle = {
    height: '5rem', // Adjust the height as needed
    width: '5rem',
  
    
  };

  return (
    <header className="lg:px-16 px-4 bg-white flex items-center py-4 shadow-md dark:shadow-md dark:bg-gray-900 text-gray-400">
      <div className="flex-1 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="ShopLink Logo" style={logoStyle} />
          <div className="hidden ml-5 font-bold text-2xl text-primary md:block">
            S<span className="ml-1 tracking-tighter">H</span>
            <span className="ml-1 tracking-tighter">O</span>
            <span className="ml-1 tracking-tighter">P</span>
            <span className="ml-1 tracking-tighter">L</span>
            <span className="ml-1 tracking-tighter">I</span>
            <span className="ml-1 tracking-tighter">N</span>
            <span className="ml-1 tracking-tighter">K</span>
          </div>
        </div>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
        <svg
          className="fill-current text-gray-900 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div className="hidden md:flex md:w-auto w-full" id="menu">
        <nav>
          <ul className="md:flex items-center justify-between text-xl text-gray-700 dark:text-gray-400">
          <li>
              <a className="md:p-4 py-3 px-0 block" href="signin">
                LogIn
              </a>
            </li>
            <li>
              <a className="md:p-4 py-3 px-0 block" href="#">
                AboutUs
              </a>
            </li>
            <li>
              <a className="md:p-4 py-3 px-0 block" href="#">
                Services
              </a>
            </li>
            <li>
              <a className="md:p-4 py-3 px-0 block" href="#">
                Team
              </a>
            </li>
            <li>
              <a className="md:p-4 py-3 px-0 block md:mb-0 mb-2" href="#">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
