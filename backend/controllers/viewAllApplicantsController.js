const  JobApplication  = require('../models/jobApplication.model');

exports.getAllApplicants = async (req, res) => {
  try {
    const applicants = await JobApplication.findAll();
    res.status(200).json(applicants);
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
