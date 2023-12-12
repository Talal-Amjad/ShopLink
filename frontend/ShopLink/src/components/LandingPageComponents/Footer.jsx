import React from 'react';
import logo from '../../assets/images/ShopLinkLogo.png';
import facebookIcon from './../../assets/images/facebook.svg';
import instaIcon from './../../assets/images/instagram.svg';
import twitterIcon from './../../assets/images/twitter.svg';
import githubIcon from './../../assets/images/github-mark.svg';

export default function Footer() {
  return (
    <div className="text-center py-11 dark:bg-gray-900">
      <a className="flex items-center justify-center mb-5 text-3xl font-semibold text-gray-900 dark:text-white">
        <img src={logo} style={{ height: '120px' }} className="mr-5 sm:h-9" alt="ShopLink Logo" />
        ShopLink
      </a>

      <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
        © 2023-2024 ShopLink™. All Rights Reserved.
      </span>

      <ul className="flex justify-center mt-5 space-x-5">
        <li>
          <a href="https://github.com/UshnaYaqoob" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400 mt-5">
            <img src={githubIcon} alt="GitHub" style={{ width: '25px', height: '25px' }} />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
            <img src={instaIcon} alt="Instagram" style={{ width: '30px', height: '30px' }} />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
            <img src={facebookIcon} alt="Facebook" style={{ width: '30px', height: '30px' }} />
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
            <img src={twitterIcon} alt="Twitter" style={{ width: '30px', height: '30px' }} />
          </a>
        </li>
      </ul>
    </div>
  );
}
