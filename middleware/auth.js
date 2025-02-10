const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.auth_token

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("hello i m in the application")
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
