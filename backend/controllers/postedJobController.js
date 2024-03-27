const { JobVacancy } = require('../models/JobVacancy.model');
const  BranchDetails  = require('../models/branchDetails.model'); 

const getPostedJobs = async (req, res) => {
  try {
    let jobs;

    const { username, status } = req.query;
    console.log('Received username:', username); // Log the received username for debugging

    const managerBranch = await BranchDetails.findOne({
      where: { managerUsername: username }
    });
    console.log('Manager branch:', managerBranch.branchId); // Log the managerBranch for debugging

    if (!managerBranch) {
      return res.status(404).json({ error: 'Manager branch not found' });
    }

    if (status && status !== 'All') {
      jobs = await JobVacancy.findAll({
        where: {
          branchId: managerBranch.branchId,
          status: status,
        },
      });
    } else {
      jobs = await JobVacancy.findAll({
        where: {
          branchId: managerBranch.branchId,
        },
      });
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

module.exports = { getPostedJobs, updateJobStatus };
