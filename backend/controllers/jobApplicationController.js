const  JobApplication  = require("../models/jobApplication.model");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { sequelize } = require("../config/dbConfig");

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/cv");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const documentFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(docx|pdf)$/i)) {
    req.fileValidationError = "Only .docx and .pdf files are allowed!";
    return cb(new Error("Only .docx and .pdf files are allowed!"), false);
  }
  cb(null, true);
};

const documentUpload = multer({
  storage: documentStorage,
  fileFilter: documentFileFilter,
}).single("cv");

exports.uploadDocument = async (req, res) => {
  try {
    documentUpload(req, res, async (err) => {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      if (err) {
        return res.status(500).send(err.message);
      }

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
        const username2 = decodeToken.username;

        // Check if the user has already applied for the same job
        const existingApplication = await JobApplication.findOne({
          where: {
            username:username2,
            jobVacancyID: req.body.jobVacancyID,
            status: "pending", 
          },
        });

        if (existingApplication) {
          return res.status(201).send("You have already applied for this job.");
        }
       
        const jobApplicationData = {
          username,
          applythrough: req.body.applythrough,
          skills: req.body.skills,
          status: "pending",
          jobVacancyID: req.body.jobVacancyID,
          jobTitle: req.body.jobTitle,
        };

        if (req.body.applythrough === 'withCV') {
          jobApplicationData.cv = req.file.path;
        }

        await JobApplication.create(jobApplicationData);

        console.log("Uploaded file:", req.file);
        res.send("Successfully added a record for the document.");
      } catch (error) {
        console.error("Failed to create a new record: ", error);
        res.status(500).send(error.message);
      }
    });
  } catch (error) {
    console.error("Failed to process upload: ", error);
    res.status(500).send(error.message);
  }
};
