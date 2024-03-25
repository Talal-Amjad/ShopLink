import React from 'react';
import Swal from 'sweetalert2';
import logo from './../../assets/images/ShopLinkLogo.png';
import axios from '../../axios';

export default function NavBar() {
  const logoStyle = {
    height: '5rem', 
    width: '5rem',
  };

  const handleTrackApplication = async () => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputBorderColor:"#4682B4",
      confirmButtonColor:"#4682B4",
      inputPlaceholder: "Enter your email address"
    });
    if (email) {
      fetchJobsByEmail(email);
    }
  };

  const fetchJobsByEmail = async (email) => {
 try {
      const response = await axios.post('/applicationstatus', { email });
      console.log(response.data);

      if (response.data.applications.length === 0) {
        Swal.fire({
          title: 'No jobs applied',
          text: 'You have not applied for any jobs.',
          confirmButtonColor: '#4682B4',
        });
      } else {
        const jobs = response.data.applications;

        // Create HTML table content
        let tableContent = '<table>';
        tableContent += '<tr><th>Job Title</th><th>Status</th><th>Branch Code</th></tr>';
        jobs.forEach(job => {
          tableContent += `<tr class="text-center justify-center"><td>${job.jobTitle}</td><td>${job.status}</td><td>${job.branchId}</td></tr>`;
        });
        tableContent += '</table>';
        Swal.fire({
          title: 'Jobs Applied',
          html: tableContent,
          confirmButtonColor: '#4682B4',
        });
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid email',
          text: 'Please enter a valid email address',
          confirmButtonColor: '#4682B4',
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'No user Found for entered Email',
          confirmButtonColor: '#4682B4',
        });
      }
    }   
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
              <a
                onClick={handleTrackApplication}
                className="flex items-center cursor-pointer justify-center mx-4 px-4 py-2 border-2 text-base font-medium rounded-md text-primary hover:bg-primary hover:text-white border-primary borde md:py-4 md:text-lg md:px-10">
                Track Application
              </a>
            </li>
            <li>
              <a className="flex items-center justify-center mx-4 px-4 py-2 border-2 text-base font-medium rounded-md t text-primary hover:bg-primary hover:text-white border-primary borde md:py-4 md:text-lg md:px-10" href="signin">
                LogIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
