// Controller
const  JobApplication  = require('../models/jobApplication.model');

const updateStatus = async (req, res) => {
  try {
    const { username, status } = req.body;
    console.log(username)

    if (status !== 'selected' && status !== 'rejected') {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Update status in the database
    const updatedJob = await JobApplication.update(
      { status },
      { where: { username } }
    );

    return res.json({ message: 'Application Status Updated Successfully', updatedJob });
  } catch (error) {
    console.error('Error updating job status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { updateStatus };
