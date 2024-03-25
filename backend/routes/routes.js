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
const jobApplicationController=require('../controllers/jobApplicationController');
const manageBranchesController = require('../controllers/manageBranchesController');
const getAllBranches= require('../controllers/getAllBranchesIds');
const jobNotificationController = require('../controllers/jobNotificationsController');
const notificationManagementControler = require('../controllers/notificationManagementController');
const addStockController = require('../controllers/addStockController');
const saleController = require('../controllers/saleController');
const allStockController = require('../controllers/allStocksController');
const manageStock =require('../controllers/managestock');
const postedJobs = require('../controllers/postedJobController');
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
router.get('/allapplicants',viewAllApplicantsController.getAllApplicantsforowner);
router.get('/pendingjobs', approveJobController.getPendingJobApplications);
router.post('/updatejobstatus', approveJobController.updateJobStatus);
router.put('/updatestatus',selectApplicantController.updateStatus);
router.post('/applicationstatus',ApplicationStatusController.getUserApplicationStatus);
router.get('/skillsreport',SkillsReport.generateSkillsReport);
router.get('/hiringreport',HiringReport.hiringreport);
router.get('/managersusername',manageBranchesController.getManagerUsernames);
router.post('/addbranch',manageBranchesController.addBranch);
router.get('/allbranches',manageBranchesController.showAllBraches);
router.get('/allbranchesids',getAllBranches.getAllBranches);
router.post('/savejobnotification',jobNotificationController.saveJobNotificaton);
router.get('/shownotifications',jobNotificationController.fetchNotifications);
router.get('/unreadNotificationCount', notificationManagementControler.getUnreadNotificationCount);
router.put('/markNotificationsAsRead', notificationManagementControler.markNotificationsAsRead);
router.delete('/deleteNotification/:notificationID', notificationManagementControler.deleteNotification);
router.post('/savepostjobnotification',jobNotificationController.savePostJobNotificaton);
router.post('/addproducts',addStockController.addProduct);
router.post('/addsale', saleController.addSale);
router.get('/branchsales',saleController.getallbranchsales);
router.get('/allstock',allStockController.getallstocks);
router.delete('/deleteproduct/:productId',manageStock.deleteProduct);
router.delete('/deletesale/:saleId',saleController.deleteSale);
router.get('/postedjobs',postedJobs.getPostedJobs)


router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
