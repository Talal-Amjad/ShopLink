const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendVerificationEmail = async (email, verificationCode) => {
  await transporter.sendMail({
    from: '"ShopLink.pk" <process.env.GMAIL>',
    to: email,
    subject: 'Your Verification Code from ShopLink',
    text: `Your verification code is: ${verificationCode}`
  });
};

const sendJobNotificationEmail = async (email, subject, message) => {
  await transporter.sendMail({
    from: '"ShopLink.pk" <process.env.GMAIL>',
    to: email,
    subject: subject,
    text: message
  });
};

module.exports = { sendVerificationEmail, sendJobNotificationEmail };
