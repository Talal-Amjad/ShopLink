const { JobVacancy } = require('../models/JobVacancy.model');

const getPendingJobApplications = async (req, res) => {
  try {
    const pendingJobs = await JobVacancy.findAll({
      where: {
        status: 'pending',
      },
    });

    res.json(pendingJobs);
  } catch (error) {
    console.error('Error fetching pending job applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const { jobVacancyID, status } = req.body;

    // Validate if status is either 'approve' or 'reject'
    if (status !== 'approve' && status !== 'reject') {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Update status in the database
    const updatedJob = await JobVacancy.update(
      { status },
      { where: { jobVacancyID } }
    );

    res.json({ message: 'Job status updated successfully', updatedJob });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getPendingJobApplications, updateJobStatus };
