const { JobVacancy } = require('../models/JobVacancy.model');
const BranchDetails = require('../models/branchDetails.model');
const jwt = require("jsonwebtoken");

exports.postJobControllers = async (req, res) => {
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
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const username = decodedToken.username;

    let branchId; // Declaring branchId variable outside the try block
    
    try {
      const branch = await BranchDetails.findOne({
        attributes: ['branchId'],
        where: {
          managerUsername: username
        }
      });
    
      if (!branch) {
        return res.status(404).send("No branch found for the manager");
      }
      
      branchId = branch.branchId; // Assigning value to branchId inside the try block
      console.log("Branch ID:", branchId);
      
    } catch (error) {
      console.error("Error retrieving branch:", error);
      return res.status(500).send("Internal server error");
    }

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
      branchId: branchId 
    });

    res.status(200).json({ successMsg: 'Job Post request submitted Successfully' });
  } catch (error) {
    console.error('Error in Job Post request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
