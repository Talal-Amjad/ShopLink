const  JobVacancy  = require('../models/postJobVacancy.model');
const { sequelize } = require('../config/dbConfig');


exports.postJobControllers = async (req, res) => {
  try {
    const {
        jobVacancyID,
        jobTitle, 
        expectedSalary, 
        jobDiscription, 
        lastDate,  
       
     
    } = req.body;

  const  jobPoster="Job Ad";
  const status="pending";

    const newJobVacancy = await JobVacancy.create({
        jobVacancyID,
        jobTitle, 
        expectedSalary, 
        jobDiscription, 
        lastDate,
        jobPoster,
        status
    });

    res.status(200).json({successMsg: 'Job Post request submitted Successfully'});
  } catch (error) {
    console.error('Error in Job Post request :', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
