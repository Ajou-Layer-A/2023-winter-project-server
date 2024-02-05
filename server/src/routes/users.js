const Router = require('express');
const usersController = require('../services/client/usersController');
const jwtUtil = require('../utils/jwtUtils');
const isAuth = require('../api/middlewares/isAuth');
const route = Router();
const config = require('../config/index');
module.exports = (app) => {
  app.use('/users', route);
  route.post('/healthCheck', async (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'Health Check',
    });
  });
  route.post('/signup', async (req, res) => {
    const userData = req.body;
    if (!userData.password || !userData.nickname || !userData.address) {
      return res.status(400).json({
        success: false,
        message: 'Please give me Info',
      });
    }
    //save user's data
    const saveDataResult = await usersController.saveUserData(userData);
    if (!saveDataResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Save ERR' + saveDataResult.message,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: saveDataResult,
      });
    }
  });

  /**
   * @route POST /users/checkNickName
   * @summary 닉네임 중복 확인(회원가입시 필요)
   */
  route.post('/checkNickName', async (req, res) => {
    const { nickname } = req.body;
    if (!nickname) {
      return res.status(400).json({
        success: false,
        message: 'Enter nickname',
      });
    }
    const checkNickNameResult = await usersController.checkNickName(nickname);
    if (!checkNickNameResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Check ERR' + checkNickNameResult.message,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: checkNickNameResult,
      });
    }
  });
  /**
   * @route GET /users/logout
   * @summary 로그아웃
   */
  route.get('/logout', isAuth, async (req, res) => {
    try {
      res.clearCookie('clientAccessToken');
      res.clearCookie('clientRefreshToken');
      return res.status(200).json({
        success: true,
        message: 'Log Out',
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'Server Err' + err,
      });
    }
  });

  /**
   * @route POST /users/login
   * @summary 로그인
   */
  route.post('/login', async (req, res) => {
    try {
      const { nickname, password } = req.body;
      if (!nickname || !password) {
        return res.status(400).json({
          success: false,
          message: 'Enter nickname Or password',
        });
      }
      //nickname compare
      const userResult = await usersController.getUserInfo(nickname);
      if (!userResult.success) {
        return res.status(400).json({
          success: false,
          message: "Can't Find NickName",
        });
      }
      //pw compare
      const pwCompare = await userResult.data.comparePassword(password);
      if (!pwCompare) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect Password',
        });
      }
      //geting user's id
      const user_id = userResult.data._id;
      //making token , saving cookie
      const accessToken = jwtUtil.generateAccessToken(nickname, user_id);
      const refreshToken = jwtUtil.generateRefreshToken(nickname, user_id);
      const saveCookie = await usersController.setClientTokenCookie(
        res,
        accessToken,
        refreshToken
      );
      if (!saveCookie) {
        return res.status(400).json({
          success: false,
          message: 'Saving Cookie false',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'login success' + accessToken + refreshToken,
        data: userResult.nickname,
      });
    } catch (err) {
      console.log('Error', err);
      return res.status(400).json({
        success: false,
        message: 'Error in Server',
      });
    }
  });
};

/**
 * @route POST /users/connectWallet
 * @summary 사용자 지갑 주소 저장(첫 연결 or 지갑 교체), 로그인 필요(isAuth)
 */

route.post('/connectWallet', isAuth, async (req, res) => {
  const { nickname, address } = req.body;
  if (!nickname || !address) {
    return res.status(400).json({
      success: false,
      message: 'Enter nickname Or address',
    });
  }

  const saveWalletResult = await usersController.saveUserWalletAddress(
    nickname,
    address
  );

  if (!saveWalletResult.success) {
    return res.status(400).json({
      success: false,
      message: 'Save ERR' + saveWalletResult.message,
    });
  } else {
    return res.status(200).json({
      success: true,
      message: saveWalletResult,
    });
  }
});
