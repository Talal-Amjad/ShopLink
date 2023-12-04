import React from 'react'

export default function HeroSection() {
  return (
    <section className="w-auto mx-auto px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-900">

    <div
        className="w-auto px-4 sm:px-6 lg:px-8 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
        <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                <span className="block xl:inline"> Transforming </span>
                <span className="block text-indigo-600 xl:inline"> Shop Management</span>
            </h1>
            <p
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
               Empower your business with data-driven decision-making.
               ShopLink helps you manage multiple shops efficiently.
            </p>
         
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="/signin"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                        Get Statred
                    </a>
                </div>
            </div>
        </div>
        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
            <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="Picture"/>
        </div>
      
    </div>

</section>
  )
}
