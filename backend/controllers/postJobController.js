const { JobVacancy } = require('../models/JobVacancy.model');
const { sequelize } = require('../config/dbConfig');

exports.postJobControllers = async (req, res) => {
  try {
    const {
      jobTitle,
      expectedSalary,
      jobDescription,
      experience,
      lastDate,
      skills,
    } = req.body;

    const newJobVacancy = await JobVacancy.create({
      jobTitle,
      expectedSalary,
      jobDiscription: jobDescription,
      experience,
      lastDate,
      skills: JSON.stringify(skills),
    });

    res.status(200).json({ successMsg: 'Job Post request submitted Successfully' });
  } catch (error) {
    console.error('Error in Job Post request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
