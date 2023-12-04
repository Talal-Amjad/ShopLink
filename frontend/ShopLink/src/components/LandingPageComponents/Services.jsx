import React from 'react'
import OnlineStore from "../../assets/images/OnlineStore.png"
import Hiring from "../../assets/images/Hiring.png"
import PowerBI from "../../assets/images/PowerBI.png"
export default function Services() {
  return (
    <div className="mx-auto max-w-auto text-center py-16 dark:bg-gray-900">
    <h2 className="mb-12 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl">Services
    </h2>
    <div
        className="gr mx-auto max-w-3xl items-stretch space-y-4 text-left sm:flex sm:space-y-0 sm:space-x-8 sm:text-center">
        <a className="flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl">
            <img className="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32" src={OnlineStore} alt="Shop Management"/>
            <div>
                <div className="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">Centralized Shop Management</div>
                
            </div>
        </a>
        <a className="flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl">
            <img className="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32" src={Hiring} alt="Hiring"/>
            <div>
                <div className="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">NLP-Powered Hiring</div>
               
            </div>
        </a>
        <a className="flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl">
            <img className="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32" src={PowerBI} alt="PowerBI"/>
            <div>
                <div className="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">PowerBI Integration</div>
            </div>
        </a>
    </div>
</div>
  )
}
