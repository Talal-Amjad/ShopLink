const JobApplication = require('../models/jobApplication.model');
const BranchDetails = require('../models/branchDetails.model');

exports.getAllApplicants = async (req, res) => {
  try {
    const { username, status } = req.query;
    const managerBranch = await BranchDetails.findOne({
      where: { managerUsername: username }
    });

    let applicants;
    
    if (status && status !== 'All') {
      applicants = await JobApplication.findAll({
        where: { branchId: managerBranch.branchId, status }
      });
    } else {
      applicants = await JobApplication.findAll({
        where: { branchId: managerBranch.branchId }
      });
    }

    res.status(200).json(applicants);
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


exports.getAllApplicantsforowner = async (req, res) => {
  try {
    let applicants;

    // Check if both branchId and status are provided and not 'All'
    if ((req.query.branchId && req.query.branchId !== 'All') && (req.query.status && req.query.status !== 'All')) {
      applicants = await JobApplication.findAll({
        where: {
          branchId: req.query.branchId,
          status: req.query.status,
        },
      });
    } 
    // Check if only branchId is provided and not 'All'
    else if (req.query.branchId && req.query.branchId !== 'All') {
      applicants = await JobApplication.findAll({
        where: {
          branchId: req.query.branchId,
        },
      });
    } 
    // Check if only status is provided and not 'All'
    else if (req.query.status && req.query.status !== 'All') {
      applicants = await JobApplication.findAll({
        where: {
          status: req.query.status,
        },
      });
    } 
    // Fetch all applicants if neither branchId nor status is provided or if they are 'All'
    else {
      applicants = await JobApplication.findAll();
    }

    res.json(applicants);
  } catch (error) {
    console.error('Error fetching pending job applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

