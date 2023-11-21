const nodemailer = require("nodemailer");


const sendVerificationEmail = async (email, verificationCode) => {
  
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.APP_PASSWORD,
    }
  });

  await transporter.sendMail({
    from: '"ShopLink.pk" <process.env.GMAIL>',
    to: email,
    subject: 'Your Verification Code from ShopLink',
    text: `Your verification code is: ${verificationCode}`
});

};


module.exports = {sendVerificationEmail };