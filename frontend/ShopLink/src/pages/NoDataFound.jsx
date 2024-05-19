import React from 'react';

function NoDataFound() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[90%] md:w-[40%] bg-white px-3 py-10 flex flex-col flex-wrap justify-center items-center shadow-xl">
        <div className="flex flex-row">
          <p className='text-9xl font-semibold'>4<span className='text-sky-500'>0</span>4</p>
        </div>
        <p className='uppercase font-semibold m-4 text-center'>No Record Found</p>
      </div>
    </div>
  );
}

export default NoDataFound;
