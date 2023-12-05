const express = require('express');
const authController = require('../controllers/authController');
const JobApplicationController=require('../controllers/jobApplicationController');
const postJobController=require('../controllers/postJobController');
const forgetpass = require("../controllers/forgotPasswordController")

const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/verify', authController.verifyUser)
router.post('/signin', authController.signIn);
router.post('/apply',JobApplicationController.JobApplicationfunction);
router.post('/postjob',postJobController.postJobControllers);
router.post('/verif_foretpass_email', forgetpass.verify_forget_Password_email)
router.post('/verify_email_encoded_pass', forgetpass.verify_forgetpass)
router.post('/changepass', forgetpass.change_password)
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
