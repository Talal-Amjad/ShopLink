import React from "react";

const Table = ({ headerData, tableData }) => {
  return (
    <div className="overflow-x-auto ml-7 mr-7">
      <table className="table w-full border-separate border-collapse border-spacing-y-3 scroll-y">
        <thead>
          <tr className="rounded-row rounded-lg text-gray-500 z-40 p-4 dark:bg-gray-900 dark:text-gray-300">
            {headerData.map((header, index) => (
              <th
                className="p-4 font-manrope text-lg min-w-0"
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
                <td className="p-4 font-manrope text-md min-w-0" key={cellIndex}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
