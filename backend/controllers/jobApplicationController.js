const  JobApplication  = require('../models/jobApplication.model');
const { sequelize } = require('../config/dbConfig');


exports.JobApplicationfunction = async (req, res) => {
  try {
    const {
    
      applythrough,
      cv,
      skills,
    } = req.body;

  
    const username ='temp2';  
    const status='pending'
    const jobVacancyID='cs123'

    const newApplication = await JobApplication.create({
        username,
        applythrough,
        cv,
        skills,
        status,
        jobVacancyID
    });

    res.status(200).json({successMsg: 'Application Submitted Successfully'});
  } catch (error) {
    console.error('Error in Application Submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
