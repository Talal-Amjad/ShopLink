const  {JobVacancy} = require('../models/JobVacancy.model');
const { sequelize } = require('../config/dbConfig');

exports.getAllJobs = async (req, res) => {
  try {
    const pendingJobs = await JobVacancy.findAll({
      where: {
        status: 'approve',
      },
    });

    res.status(200).json(pendingJobs);
  } catch (error) {
    console.error('Error fetching pending jobs:', error);

    if (error.name === 'SequelizeDatabaseError') {
      res.status(500).json({ error: 'Database error' });
    } else if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error: ' + error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
