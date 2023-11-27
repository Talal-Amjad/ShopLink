const express = require('express');
const authController = require('../controllers/authController');
const JobApplicationController=require('../controllers/jobApplicationController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/verify', authController.verifyUser)
router.post('/signin', authController.signIn);
router.post('/apply',JobApplicationController.JobApplicationfunction);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
