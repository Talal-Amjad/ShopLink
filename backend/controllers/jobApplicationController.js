const JobApplication = require('../models/jobApplication.model');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { sequelize } = require('../config/dbConfig');

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/cv");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const documentFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(docx|pdf)$/i)) {
    req.fileValidationError = 'Only .docx and .pdf files are allowed!';
    return cb(new Error('Only .docx and .pdf files are allowed!'), false);
  }
  cb(null, true);
};

const documentUpload = multer({
  storage: documentStorage,
  fileFilter: documentFileFilter
}).single('cv');

exports.uploadDocument = async (req, res) => {
  try {
    documentUpload(req, res, async (err) => {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      if (err) {
        return res.status(500).send(err.message);
      }

      const token = req.headers.authorization.split(' ')[1];
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      const username = decodeToken.username;

      try {
        await sequelize.sync();
        console.log("Document table synced successfully!");

        await JobApplication.create({
          cv: req.file.path,
          username: username,
          applythrough: req.body.applythrough,
          skills: req.body.skills,
          status: 'pending',
          jobVacancyID: req.body.jobVacancyID,
          jobTitle: req.body.jobTitle
        });

        console.log("Uploaded file:", req.file);
        res.send("Successfully added record for the document.");
      } catch (error) {
        console.error("Failed to create new record: ", error);
        res.status(500).send(error.message);
      }
    });
  } catch (error) {
    console.error("Failed to process upload: ", error);
    res.status(500).send(error.message);
  }
};
