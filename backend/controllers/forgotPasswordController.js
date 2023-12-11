const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/dbConfig');
const User = require('../models/user');
const {sendVerificationEmail} = require('../config/transporter')
const crypto = require('crypto');
const bcrypt = require('bcrypt');


let temp_forget_pass = 0;
  let temp_forgetpass_email = "";
  const verify_forget_Password_email = async (req, res) => {
    try {
      await sequelize.sync();
  
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (user) {
        const forgetpass_verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
        await sendVerificationEmail(req.body.email, forgetpass_verificationCode);
        res.send("Verification code sent to your email");
  
        temp_forget_pass = forgetpass_verificationCode;
        temp_forgetpass_email = req.body.email;
      } else {
        res.status(404).send("Email not found");
      }
    } catch (error) {
      console.error("Error: ", error.message);
      res.status(500).send(error.message);
    }
  };
  

let isVerified = false;
const verify_forgetpass = async (req, res) => {
  try {
      const { verificationCode } = req.body;
      if (temp_forget_pass !== verificationCode) {
        return res.status(400).send('Invalid verification code');
    }

    isVerified = true;
    res.send('User verified. You can now change your password.');
  } catch (error) {
      console.error("Error in verifyUser: ", error);
      res.status(500).send(error.message);
  }
};

const change_password = async (req, res) => {
  try {
    console.log(req.body.pass);
    const hashedPassword = await bcrypt.hash(req.body.pass, 10);
    console.log(hashedPassword);
    if (!isVerified) {
      return res.status(403).send('Cannot update the password');
    }


    const updatedUser = await User.update(
      {
        password: hashedPassword,
      },
      {
        where: { email: temp_forgetpass_email },
      }
    );

    if (updatedUser[0] === 0) {
      return res.status(404).send(new errorHandler('Email does not exist', 404));
    }

    console.log('Successfully updated record.');
    res.status(200).send('Data updated');
  } catch (error) {
    console.error('Failed to update record:', error);
    res.status(500).send(error.message);
  }
};


module.exports = {
    verify_forget_Password_email,
    verify_forgetpass,
    change_password
}