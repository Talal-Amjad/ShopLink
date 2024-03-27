import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Table from '../../components/Table/Table';
import OwnerDashboardLayout from '../../components/layouts/ShopOwner/ownerDashboardLayout';
import Button from '../../components/Buttons/Button';
import useModal from "../../hooks/useModal";
import AddBranch from './AddBranch';
import UpdateBranch from './UpdateBranch';

const ShowAllBranches = () => {
  const [branches, setBranches] = useState([]);
  const [isOpen, toggleModal] = useModal();
  const [isOpenUpdate, toggleModalUpdate] = useModal();
  const [selectedBranch, setSelectedBranch] = useState(null); // New state to hold the selected branch for editing

  useEffect(() => {
    axios.get('/allbranches')
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setBranches(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleUpdate = (branch) => {
    setSelectedBranch(branch);
    toggleModalUpdate();
  };

  const handleDelete = async (branchId) => {
    try {
      await axios.delete(`/deletebranches/${branchId}`);
      // Remove the deleted branch from the state
      setBranches(prevBranches => prevBranches.filter(branch => branch.branchId !== branchId));
      console.log('Branch deleted successfully');
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  const headerData = ['Branch ID', 'City', 'Manager', 'Actions'];

  return (
    <OwnerDashboardLayout>
      <div className="flex justify-between items-center my-2 mt-8">
        <p className="font-semibold text-2xl dark:text-gray-400">Branches</p>
        <div>
          <Button text="+ Add new Branch" type="button" roundedFull={true} onClick={() => toggleModal()} />
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
          <div>
            <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" onClick={() => handleUpdate(branch)}>Edit</button>
            <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" onClick={() => handleDelete(branch.branchId)}>Delete</button>
          </div>
        ])}
      />
      {isOpen && <AddBranch isOpen={isOpen} onClose={toggleModal} />}
      {isOpenUpdate && <UpdateBranch isOpen={isOpenUpdate} onClose={toggleModalUpdate} branch={selectedBranch} />} 
    </OwnerDashboardLayout>
  );
};

export default ShowAllBranches;
