import React from "react";

const Table = ({ headerData, tableData }) => {
  return (
    <table className="table w-full border-separate border-collapse border-spacing-y-3 scroll-y">
     <thead>
        <tr className="rounded-row bg-white rounded-lg text-gray-500 z-40 p-4 dark:bg-gray-900 dark:text-gray-400">
          {headerData.map((header, index) => (
            <th
              className="p-4 font-manrope font-bold text-xl w-1/5"
              key={index}
            >
              <div
                className={`flex ${
                  index === 0 ? "justify-start" : "justify-center"
                }`}
              >
                {header}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr
            className="bg-white mt-6 rounded-md text-center justify-center  transition-all duration-[400ms] z-40 p-4 dark:bg-gray-900 dark:text-gray-400"
            key={index}
           
          >
            {row.map((cell, cellIndex) => (
              <td className="p-4 font-manrope text-sm w-1/5" key={cellIndex}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
