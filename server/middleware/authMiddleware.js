const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
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
  return (req, res, next) => {
    const user = req.user;
    if (user && allowedUserTypes.includes(user.usertype)) {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Permission denied.' });
    } 
  };
};
    

module.exports = {verifyToken,checkUserType};
