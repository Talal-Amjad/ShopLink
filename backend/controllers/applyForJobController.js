// applyForJobController.js
const {JobApplication} = require('../models/jobApplication.model');

// Function to apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { username, applythrough, experience, cv, skills, jobVacancyID, jobTitle } = req.body;

    // Create a new job application
    await JobApplication.create({
      username,
      applythrough,
      experience,
      cv,
      skills,
      jobVacancyID,
      jobTitle,
      status: 'pending' // Assuming initial status is pending
    });

    // Send success response
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
