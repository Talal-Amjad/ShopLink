const  BranchDetails  = require('../models/branchDetails.model');

const getAllBranches = async (req, res) => {
  try {
    const branches = await BranchDetails.findAll();
    res.json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllBranches
};
