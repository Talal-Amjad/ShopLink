const JobApplication = require('../models/jobApplication.model');
const User = require('../models/user');

exports.getUserApplicationStatus = async (req, res) => {
  const { email } = req.body; 
  try {
    // Find the user based on the email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      const username = user.username;

      // Fetch job titles and statuses for all applied jobs against the username
      const applications = await JobApplication.findAll({ 
        where: { username }, 
        attributes: ['jobVacancyID','jobTitle', 'status','branchId'] 
      });

      if (!applications || applications.length === 0) {
        return res.status(404).json({ message: 'No applications found for this user' });
      }

      return res.json({ applications });
    }
  } catch (error) {
    console.error('Error fetching application status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
