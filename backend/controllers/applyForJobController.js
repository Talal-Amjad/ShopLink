const JobApplication = require('../models/jobApplication.model');
const jwt = require("jsonwebtoken");
const { sequelize } = require("../config/dbConfig");

exports.applyForJob = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).send("Authorization header is missing");
    }

    const tokenParts = authorizationHeader.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).send("Invalid Authorization header format");
    }

    const token = tokenParts[1];

    try {
      await sequelize.sync();
      console.log("Document table synced successfully!");

      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      const username = decodeToken.username;
      const jobApplicationData = {
        username,
        applythrough: req.body.applythrough,
        skills: req.body.skills,
        experience: req.body.experience,
        status: "pending",
        jobVacancyID: req.body.jobVacancyID,
        jobTitle: req.body.jobTitle,
      };

      if (req.body.applythrough === 'withCV' && req.file) {
        jobApplicationData.cv = req.file.path;
      }

      await JobApplication.create(jobApplicationData);

      return res.status(201).send({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error applying for job:', error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error handling authorization:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
