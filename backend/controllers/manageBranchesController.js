const User = require('../models/user');
const BranchDetails = require('../models/branchDetails.model');
const { Op } = require('sequelize');

// Controller function to get usernames of all users with role "manager"
const getManagerUsernames = async (req, res) => {
  try {
    const managers = await User.findAll({
      attributes: ['username'],
      where: {
        role: 'manager'
      }
    });
    const managerUsernames = managers.map(manager => manager.username);
    res.status(200).json(managerUsernames);
  } catch (error) {
    console.error('Error fetching manager usernames:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to add a new branch
const addBranch = async (req, res) => {
    try {
      const { branchcode, managerusername, city } = req.body;
  
      // Check if the branch code already exists
      const branchExists = await BranchDetails.findOne({
        where: {
          branchId: branchcode
        }
      });
      if (branchExists) {
        return res.status(400).json({ error: 'Branch ID already exists' });
      }
  
      // Check if the manager username is already appointed at another branch
      const managerExists = await BranchDetails.findOne({
        where: {
          managerUsername: managerusername,
          branchId: {
            [Op.ne]: branchcode
          }
        }
      });
      if (managerExists) {
        return res.status(400).json({ error: 'Selected manager already appointed at another branch' });
      }
  
      // Create a new branch record
      await BranchDetails.create({
        branchId: branchcode,
        managerUsername: managerusername,
        city: city
      });
  
      res.status(201).json({ message: 'Branch added successfully' });
    } catch (error) {
      console.error('Error adding branch:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const showAllBraches = async (req, res) => {
    try {
      const branches = await BranchDetails.findAll();
      res.status(200).json(branches);
      return;
    } catch (error) {
      console.error('Error fetching Applicants Data:', error);
      
      if (error.name === 'SequelizeDatabaseError') {
        res.status(500).json({ error: 'Database error' });
      } else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ error: 'Validation error: ' + error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };


module.exports = { getManagerUsernames,
   addBranch,
   showAllBraches 
  };
