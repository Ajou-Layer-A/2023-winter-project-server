const jwt = require('jsonwebtoken');
const config = require('../config/index.js');
const UserModels = require('../models/user.js');

module.exports = {
  /**
   * @param {string} nickname
   * @returns Access Token
   */
  generateAccessToken: (nickname, user_id) => {
    const payload = {
      nickname: nickname,
      user_id: user_id,
    };

    return jwt.sign(payload, config.jwtSecretKey, {
      expiresIn: '15m',
      algorithm: 'HS256',
      issuer: config.jwt.isu,
      audience: config.jwt.aud,
      isAdmin: false,
    });
  },

  /**
   * @param {string} nickname
   * @returns Refresh Token
   */
  generateRefreshToken: (nickname, user_id) => {
    const payload = {
      nickname: nickname,
      user_id: user_id,
    };

    return jwt.sign(payload, config.jwtRefreshSecretKey, {
      expiresIn: '7d',
      algorithm: 'HS256',
      issuer: config.jwt.isu,
      audience: config.jwt.aud,
      subject: 'auth',
    });
  },

  /**
   * @param {string} token
   * @returns result
   */
  verify: (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.jwtSecret);
      return {
        success: true,
        decoded: decoded,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: err,
      };
    }
  },

  /**
   * @param {string} token
   * @returns result
   */
  refreshVerify: (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.jwtRefreshSecret);
      return {
        success: true,
        decoded: decoded,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: err,
      };
    }
  },
};
