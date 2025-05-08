const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const axios = require('axios');

dotenv.config();

const { JWT_SECRET , FAST2SMS_API_KEY , DEV } = process.env;

function generateToken(user) {
  const token = jwt.sign({ name: user.name, userType: user.userType , _id:user._id }, JWT_SECRET, { expiresIn: '1d' });
  return token;

}


const generateOTP = () => {
  if (DEV) {
    return 123456
  }
  return Math.floor(100000 + Math.random() * 900000).toString();
};


const sendOtpSMS = async (phone  ,otp) => {

  try {
      const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
          variables_values: otp,
          route: 'otp',
          numbers: phone
      }, {
          headers: {
              authorization: FAST2SMS_API_KEY,
              'Content-Type': 'application/json'
          }
      });

      if (response.data.return) {
          return { success: true, otp, message: 'OTP sent successfully' };
      } else {
          return { success: false, message: 'Failed to send OTP' };
      }
  } catch (error) {
      console.error('Error sending SMS:', error.message);
      return { success: false, message: 'Error sending OTP' };
  }
};



const sendOtpEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code From BrajRides',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending OTP:', error);
    } else {
      console.log('OTP sent:', info.response);
    }
  });
};


module.exports = { generateToken ,  generateOTP , sendOtpEmail ,  sendOtpSMS};