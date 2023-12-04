import React from 'react'

export default function AboutUS() {
  return (
    <section className="bg-gray-100 dark:bg-gray-600">
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-900 text-lg text-justify">
                Welcome to ShopLink, where shop management meets innovation! Our centralized platform revolutionizes the way owners oversee their businesses by offering a user-friendly interface to monitor stock levels, track branch-specific sales, and efficiently manage their workforce. What sets us apart is our cutting-edge Natural Language Processing (NLP) technology, which extracts applicant skills from CVs and presents them in a graphical format exclusively visible to owners and managers, streamlining the hiring process. But we don't stop there – ShopLink seamlessly integrates with Power BI, providing visualizations that unveil sales trends, profitability metrics, and employee performance. This integration transforms raw data into actionable insights, empowering owners with the tools for informed decision-making. Join us on the journey to simplify shop management, enhance operations, and elevate your business to new heights with ShopLink!
                </p>
               
            </div>
            <div className="mt-12 md:mt-0">
                <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="About Us Image" className="object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    </div>
</section>
  )
}
