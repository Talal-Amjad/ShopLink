const JobApplication  = require('../models/jobApplication.model')
const  User  = require('../models/user');
const BranchDetails  = require('../models/branchDetails.model'); 
const {Employee} =require('../models/employee.model');

const getEmployees = async (req, res) => {
  try {
    const { username } = req.query;

    
    const branch = await BranchDetails.findOne({
      where: { managerUsername: username }
    });
    const branchId = branch.branchId;

   
    const jobApplications = await Employee.findAll({
      where: { branchId: branchId}
    });

    


    res.json(jobApplications);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getEmployeesForOwner=async(req,res)=>{
  try {
    let jobApplications;
  const { branchId } = req.query;

  if ((req.query.branchId && req.query.branchId !== 'All')) {
    jobApplications = await Employee.findAll({
    where: { branchId: branchId}
  });
}else{
  jobApplications = await Employee.findAll();
}

  res.json(jobApplications);
} catch (error) {
  console.error('Error fetching employees:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
};

const deleteEmployee = async (req, res) => {
  try {
    const { employeeID } = req.params;

    // Delete the employee using Sequelize
    const deletedEmployeeCount = await Employee.destroy({
      where: {
        employeeID: employeeID
      }
    });

    // Check if any rows were affected
    if (deletedEmployeeCount > 0) {
      res.status(200).json({ message: 'Employee deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Employee not found.' });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Controller to fetch employee details by ID
const getEmployeeById = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update employee details by ID
const updateEmployee = async (req, res) => {
  const { employeeId } = req.params;
  const { firstname, lastname, username, designation, email, branchId } = req.body;
  try {
    console.log("Updating employee with ID:", employeeId);
    console.log("New data:", { firstname, lastname, username, designation, email, branchId });

    // Check if the employee exists
    const existingEmployee = await Employee.findByPk(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Update employee details
    const [updatedCount, updatedRows] = await Employee.update(
      { firstname, lastname, username, designation, email, branchId },
      { where: { employeeID: employeeId }, returning: true } // Add returning: true to get updated rows
    );

    console.log("Updated count:", updatedCount);
    console.log("Updated rows:", updatedRows);

    if (updatedCount > 0) {
      return res.status(200).json({ message: 'Employee updated successfully' });
    } else {
      return res.status(404).json({ message: 'Employee not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






module.exports = { getEmployees, getEmployeesForOwner,deleteEmployee,getEmployeeById,updateEmployee };
