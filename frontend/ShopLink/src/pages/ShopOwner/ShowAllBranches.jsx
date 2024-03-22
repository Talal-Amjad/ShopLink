import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import OwnerDashboradLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';
import Button from '../../components/Buttons/Button';
import useModal from "../../hooks/useModal";
import AddBranch from './AddBranch';
import UpdateBranch from './UpdateBranch';

const Actions = ({ menuItems, onCancel }) => {
  return (
    <div className="absolute w-[126px] bg-white rounded text-sm right-0 mt-2 max-w-xs transition-all duration-[400ms] dark:bg-gray-900 dark:text-gray-400">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="block w-full p-1 hover:bg-primary hover:text-white"
          onClick={() => {
            item.onClick();
            if (item.label === 'Cancel') {
              onCancel();
            }
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

const ShowAllBranches = () => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [branches, setBranches] = useState([]);
  const [isOpen, toggleModal] = useModal();
  const [isOpenUpdate, toggleModalUpdate] = useModal(); // Corrected state name

  const handleAddNewBranch = () => {
    toggleModal();
  };

  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get('/allbranches')
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setBranches(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleUpdate = () => {
    console.log("Update Clicked");
    toggleModalUpdate(); // Corrected function name
  };

  const handleDelete = () => {
    // Handle delete logic here
  };

  const handleCancel = () => {
    setSelectedMenuIndex(null); // Toggle off the menu
  };

  const actionMenuItems = [
    { label: "Update", onClick: handleUpdate },
    { label: "Delete", onClick: handleDelete },
    { label: "Cancel", onClick: handleCancel },
  ];

  const handleMenuClick = (index) => {
    setSelectedMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const headerData = ['Branch ID', 'City', 'Manager', 'Actions'];

  return (
    <OwnerDashboradLayout>
      <div className="flex justify-between items-center my-2 mt-8">
        <p className="font-semibold text-2xl dark:text-gray-400">Branches</p>
        <div>
          <Button text="+ Add new Branch" type="button" roundedFull={true} onClick={handleAddNewBranch} />
        </div>
      </div>
      <Table
        headerData={headerData}
        tableData={branches.map((branch, index) => [
          <div className="flex items-center">
            <div>{branch.branchId}</div>
          </div>,
          branch.city,
          branch.managerUsername,
          <>
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => handleMenuClick(index)}
            >
              <FiMoreVertical />
            </div>
            {selectedMenuIndex === index && (
              <Actions
                menuItems={actionMenuItems}
                onCancel={handleCancel}
              />
            )}
          </>,
        ])}
      />
      {isOpen && <AddBranch isOpen={isOpen} onClose={toggleModal} />}
      {isOpenUpdate && <UpdateBranch isOpen={isOpenUpdate} onClose={toggleModalUpdate} />} {/* Corrected variable name */}
    </OwnerDashboradLayout>
  );
};

export default ShowAllBranches;
