// Controller
const JobApplication = require('../models/jobApplication.model');
const User = require('../models/user'); // Import the User model
const { Employee } = require('../models/employee.model'); // Import the Employee model

const updateStatus = async (req, res) => {
  try {
    const { username, jobVacancyID, status } = req.body;

    if (status !== 'selected' && status !== 'rejected') {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Update status in the job application table
    const updatedJob = await JobApplication.update(
      { status },
      { where: { username, jobVacancyID } }
    );

    if (status === 'selected') {
      // Fetch user details from the User table
      const user = await User.findOne({ where: { username } });
      const { firstname, lastname, email } = user;

      // Fetch job title from the job application table
      const jobApplication = await JobApplication.findOne({ where: { username, jobVacancyID } });
      const { jobTitle, branchId } = jobApplication;

      // Create a new employee entry
      const newEmployee = await Employee.create({
        firstname,
        lastname,
        username,
        designation: jobTitle,
        email,
        branchId
      });

      console.log('New employee added:', newEmployee);

      // Return response
      return res.json({ message: 'Application Status Updated Successfully', updatedJob });
    }

    return res.json({ message: 'Application Status Updated Successfully', updatedJob });
  } catch (error) {
    console.error('Error updating job status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { updateStatus };
