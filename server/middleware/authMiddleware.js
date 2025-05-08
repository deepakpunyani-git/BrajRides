const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  // console.log('>>> verifyToken called');

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
        next();
    });

};

const checkUserType = (allowedUserTypes) => {
  // console.log(allowedUserTypes)
  return (req, res, next) => {
    const user = req.user;
    // console.log(allowedUserTypes)
    if (user && allowedUserTypes.includes(user.userType)) {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Permission denied.' });
    } 
  };
};
    

module.exports = {verifyToken,checkUserType};
