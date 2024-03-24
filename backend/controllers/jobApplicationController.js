const JobApplication = require('../models/jobApplication.model');
const jwt = require("jsonwebtoken");

const applyForJob = async (req, res) => {
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
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const username = decodeToken.username;
    const { experience, skills, jobVacancyID, jobTitle,branchId } = req.body;
    console.log(username);

    // Validate if required fields are present
    if (!experience || !skills || !jobVacancyID || !jobTitle) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the user has already applied for this job
    const existingApplication = await JobApplication.findOne({where:{ username, jobVacancyID }});

    if (existingApplication) {
      return res.status(409).json({ message: 'You have already applied for this job' });
    }

    // If not, create a new application
    const jobApplication = await JobApplication.create({
      username,
      experience,
      skills,
      status: 'Pending',
      jobVacancyID,
      jobTitle,
      branchId
    });

    res.status(201).json({ message: 'Application submitted successfully', jobApplication });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'There was an error submitting the application. Please try again.' });
  }
};

module.exports = { applyForJob };
