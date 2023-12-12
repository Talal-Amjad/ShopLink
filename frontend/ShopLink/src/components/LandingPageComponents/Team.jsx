import React from 'react';

export default function Team() {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-600 transition-all duration-300 hover:shadow-lg hover:bg-gray-100 text-gray-900 sm:text-4xl">
    <div className="container mx-auto px-6 md:px-12 xl:px-32">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">Meet The Team</h2>
      </div>
        <div className="grid gap-12 items-center md:grid-cols-3">
          <div className="space-y-4 text-center">
            <img
              className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64 hover:scale-110 transition-transform duration-300 shadow-md"
              src="https://tailus.io/sources/blocks/classic/preview/images/man.jpg"
              alt="Talal"
              loading="lazy"
              width="640"
              height="805"
            />
            <div>
              <h4 className="text-2xl">M Talal Amjad</h4>
              <span className="block text-sm text-gray-500 dark:text-gray-900">Developer</span>
            </div>
          </div>
          {/* Second team member */}
          <div className="space-y-4 text-center">
            <img
              className="w-64 h-64 mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-80 hover:scale-110 transition-transform duration-300 shadow-md"
              src="https://tailus.io/sources/blocks/classic/preview/images/woman.jpg"
              alt="Ushna"
              loading="lazy"
              width="1000"
              height="667"
            />
            <div>
              <h4 className="text-2xl">Ushna Yaqoob</h4>
              <span className="block text-sm text-gray-500 dark:text-gray-900">Developer</span>
            </div>
          </div>
          {/* Third team member */}
          <div className="space-y-4 text-center">
            <img
              className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64 hover:scale-110 transition-transform duration-300 shadow-md"
              src="https://tailus.io/sources/blocks/classic/preview/images/man.jpg"
              alt="Talha"
              loading="lazy"
              width="1000"
              height="667"
            />
            <div>
              <h4 className="text-2xl">Talha Shahid</h4>
              <span className="block text-sm text-gray-500 dark:text-gray-900">Developer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
