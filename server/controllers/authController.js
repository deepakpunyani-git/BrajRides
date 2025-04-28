const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { generateToken , generateOTP ,  sendOtpSMS  } = require('../helpers');

dotenv.config();

// const emailLogin = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email } = req.body;

//     try {
//         let user = await User.findOne({ email });

//         if (!user || user.userType === 'user') {
//             user = new User({ email, email_otp: generateOTP(), email_otp_dateCreated: Date.now(), userType: 'user' });
//             await user.save();
//         } else {
//             user.email_otp = generateOTP();
//             user.email_otp_dateCreated = Date.now();
//             await user.save();
//         }

//         sendOtpEmail(user.email, user.email_otp);

//         return res.status(200).json({ success: true, message: 'OTP sent to your email' });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
//     }
// };


const phoneLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone } = req.body;

    try {
        let user = await User.findOne({ phone });

        if (!user) {
            user = new User({
                phone,
                phone_otp: generateOTP(),
                phone_otp_dateCreated: Date.now(),
                userType: 'user'
            });
            await user.save();
            sendOtpSMS(user.phone, user.phone_otp); 

        } else {
            if(user.userType === 'user'){
                user.phone_otp = generateOTP();
                user.phone_otp_dateCreated = Date.now();
                await user.save();
                sendOtpSMS(user.phone, user.phone_otp); 

                }else{
                    return res.status(500).json({ success: true, message: 'User not found' });
     
                }
            }
           


        return res.status(200).json({ success: true, message: 'OTP sent to your phone' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
    }
};

const verifyPhoneOtp = async (req, res) => {
    const { phone, otp } = req.body;

    try {
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        if (user.block_user) {
            return res.status(403).json({ success: false, message: 'User is blocked' });
        }

        if (user.phone_otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        const token = generateToken(user);
        return res.status(200).json({
            success: true,
            message: 'OTP verified',
            token,
            user: { phone: user.phone }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to verify OTP',
            error: error.message
        });
    }
};
// const verifyOtp = async (req, res) => {
//     const { email, otp } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user || user.email_otp !== otp) {
//             return res.status(400).json({ success: false, message: 'Invalid OTP' });
//         }
//         const token = generateToken(user);

//         return res.status(200).json({ success: true, message: 'OTP verified', token });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: 'Failed to verify OTP', error: error.message });
//     }
// };

const adminStaffLogin = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: usernameOrEmail }, { username:usernameOrEmail }]
        });

        if (!user || (user.userType !== 'admin' && user.userType !== 'staff')) {
            return res.status(400).json({ success: false, message: 'Invalid credentials or insufficient permissions' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        return res.status(200).json({ success: true, message: 'Login successful', token , userType:user.userType });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to login', error: error.message });
    }
};

module.exports = { phoneLogin, verifyPhoneOtp, adminStaffLogin };
