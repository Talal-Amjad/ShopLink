const express = require('express');
const authController = require('../controllers/authController');
const JobApplicationController=require('../controllers/jobApplicationController');
const postJobController=require('../controllers/postJobController');
const forgetpass = require("../controllers/forgotPasswordController")
const showJobsController = require("../controllers/showJobsController")
const { authenticateToken } = require('../middleware/authMiddleware');
const viewAllApplicantsController=require('../controllers/viewAllApplicantsController');
const approveJobController=require('../controllers/approveJobController');
const selectApplicantController=require('../controllers/selectApplicantController');
const ApplicationStatusController=require('../controllers/ApplicationStatusController');
const SkillsReport=require('../controllers/SkillsReportController');
const HiringReport=require('../controllers/HiringReportController');
const fileUploadController = require('../controllers/fileUploadController');
const applyForJobController = require('../controllers/applyForJobController');
const jobApplicationController=require('../controllers/jobApplicationController')
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/verify', authController.verifyUser)
router.post('/signin', authController.signIn);
router.post('/upload', fileUploadController.uploadFile);
router.post('/apply', applyForJobController.applyForJob);
router.post('/apply2', jobApplicationController.applyForJob);
router.post('/postjob',postJobController.postJobControllers);
router.post('/verif_foretpass_email', forgetpass.verify_forget_Password_email)
router.post('/verify_email_encoded_pass', forgetpass.verify_forgetpass)
router.post('/changepass', forgetpass.change_password)
router.get('/alljobs',showJobsController.getAllJobs);
router.get('/applicants',viewAllApplicantsController.getAllApplicants);
router.get('/pendingjobs', approveJobController.getPendingJobApplications);
router.post('/updatejobstatus', approveJobController.updateJobStatus);
router.put('/updatestatus',selectApplicantController.updateStatus);
router.post('/applicationstatus',ApplicationStatusController.getUserApplicationStatus);
router.get('/skillsreport',SkillsReport.generateSkillsReport);
router.get('/hiringreport',HiringReport.hiringreport);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
