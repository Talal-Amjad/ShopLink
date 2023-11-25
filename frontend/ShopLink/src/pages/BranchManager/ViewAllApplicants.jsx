import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import Table from '../../components/Table/Table';
import ManagerDashboradLayout from '../../components/layouts/BranchManager/managerDashboardLayout';

// Function for action
const Actions = ({ menuItems }) => {
  return (
    <div className="absolute w-[126px] bg-white rounded text-sm right-0 mt-2 max-w-xs transition-all duration-[400ms] dark:bg-gray-900 dark:text-gray-400">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="block w-full p-1 hover:bg-primary hover:text-white"
          onClick={item.onClick}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

// Table Body dummy data
const tableData = [
  { employee: 'John Doe', email: 'abc@gmail.com', contact: '+923316030683', role: 'HR Manager' },
  // ... (other rows)
];
export default function ViewAllApplicants() {
  const [showMenuArray, setShowMenuArray] = useState(
    Array(tableData.length).fill(false)
  );

  const handleEdit = () => {
    // Implement handleEdit functionality
  };

  const handleRemove = () => {
    // Implement handleRemove functionality
  };

  const handleCancel = () => {
    setShowMenuArray(Array(tableData.length).fill(false));
  };
  const actionMenuItems = [
    { label: "Edit", onClick: handleEdit },
    { label: "Remove", onClick: handleRemove },
    { label: "Cancel", onClick: handleCancel },
  ];

  const handleMenuClick = (index) => {
    const updatedShowMenuArray = showMenuArray.map((value, idx) =>
      idx === index ? !value : false
    );
    setShowMenuArray(updatedShowMenuArray);
  };

  // Table header data
  const headerData = ['Employee', 'Email', 'Contact', 'Role', 'Action'];

  

  return (
    <ManagerDashboradLayout>
      <Table
        headerData={headerData}
        tableData={tableData.map((row, index) => [
          <div className="flex items-center">
            <div className="rounded h-8 w-8 flex items-center justify-center mr-2 bg-[#AEC84554] text-[#AEC845]">
              {row.employee.charAt(0)}
              {row.employee.split(' ')[1].charAt(0)}
            </div>
            <div>
              <div>{row.employee}</div>
            </div>
          </div>,
          row.email,
          row.contact,
          row.role,
          <>
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => handleMenuClick(index)}
            >
              <FiMoreVertical />
            </div>
            {showMenuArray[index] && <Actions menuItems={actionMenuItems} />}
          </>,
        ])}
      />
    </ManagerDashboradLayout>
  );
}
