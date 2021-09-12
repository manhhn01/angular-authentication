const jwt = require('jsonwebtoken');
const config = require('../config');
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, config.tokenSecret);
      req.decoded = decoded;
      next();
    }
    catch (err) {
      console.log(err);
      res.status(401).json({ message: 'Unauthorized Access' })
    }
  }
  else {
    res.status(403).json({ message: 'No Token Provided' })
  }
}