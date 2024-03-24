const { JobVacancy } = require('../models/JobVacancy.model');

// Controller: (/pendingjobs)
const getPendingJobApplications = async (req, res) => {
  try {
    let jobs;

    // Check if both branchId and status are provided and not 'All'
    if ((req.query.branchId && req.query.branchId !== 'All') && (req.query.status && req.query.status !== 'All')) {
      jobs = await JobVacancy.findAll({
        where: {
          branchId: req.query.branchId,
          status: req.query.status,
        },
      });
    } 
    // Check if only branchId is provided and not 'All'
    else if (req.query.branchId && req.query.branchId !== 'All') {
      jobs = await JobVacancy.findAll({
        where: {
          branchId: req.query.branchId,
        },
      });
    } 
    // Check if only status is provided and not 'All'
    else if (req.query.status && req.query.status !== 'All') {
      jobs = await JobVacancy.findAll({
        where: {
          status: req.query.status,
        },
      });
    } 
    // Fetch all jobs if neither branchId nor status is provided or if they are 'All'
    else {
      jobs = await JobVacancy.findAll();
    }

    res.json(jobs);
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
