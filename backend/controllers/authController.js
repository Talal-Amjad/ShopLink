const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/dbConfig');
const User = require('../models/user');
const JWT_SECRET=process.env.JWT_SECRET;
const {sendVerificationEmail} = require('../config/transporter')
const crypto = require('crypto');



const generateToken = (user) => {
  return jwt.sign({username: user.username, role: user.role,email:user.email },JWT_SECRET , {
    expiresIn: '1h',
  });
};

// Sign up
let temporaryUsers = {};
exports.signUp = async (req, res) => {
  try {
    const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    temporaryUsers[verificationCode] = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    };

    await sendVerificationEmail(req.body.email, verificationCode);

    res.status(200).json({ successMsg: 'Verification code sent to email.' });
  } catch (error) {
    console.error('Error in signUpUser:', error);
    res.status(500).send(error.message);
  }
};


exports.verifyUser = async (req, res) => {
    try {

      console.log('Request Body:', req.body);

      const { verificationCode } = req.body;
      const tempUser = temporaryUsers[verificationCode];
        console.log(verificationCode);
        console.log('Temp User:', tempUser);

        if (!tempUser) {
            return res.status(400).json({ErrorMsg: 'Invalid verification code'});
        }

        const newUser = await User.create({
            ...tempUser,
            isVerified: true
        });

        delete temporaryUsers[verificationCode];

        res.status(200).json({successMsg: 'User verified and registered successfully'});
    } catch (error) {
        console.error("Error in verifyUser: ", error);
        res.status(500).send(error.message);
    }
};

// Sign in
exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(user);
    const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
    console.log("Token Info: ",decodeToken);

    res.status(200).json({ token, successMsg: 'User Found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
