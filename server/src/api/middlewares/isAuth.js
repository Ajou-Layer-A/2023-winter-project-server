const authUtils = require('../utils/authUtils');
const jwt = require('jsonwebtoken');
const config = require('../config/index.js');

/**
 * @param {string} token
 * @returns result
 */
const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: 'not logged in',
    });
  }

  const result = authUtils.verify(accessToken);
  if (!result.success) {
    return res.status(401).json({
      success: false,
      message: result.message,
    });
  }

  req.decoded = result.decoded;
  next();
};

module.exports = verifyToken;
