const Router = require("express");
const usersController = require("../services/client/usersController");
const jwtUtil = require("../utils/jwtUtils");
const isAuth = require("../api/middlewares/isAuth");
const route = Router();

module.exports = (app) => {
    app.use("/users", route);
    route.post("/signup", async (req, res) => {
        const userData = req.body;
        if (!userData.hashed_pw || !userData.nickname || !userData.address) {
            return res.status(400).json({
                success: false,
                message: "Please give me Info",
            });
        }
        //save user's data
        const saveDataResult = await usersController.saveUserData(userData);
        if (!saveDataResult.success) {
            return res.status(400).json({
                success: false,
                message: "Save ERR" + saveDataResult.message,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: saveDataResult,
            });
        }
    });

    /**
     * @route POST /users/login
     * @summary 로그인
     */
    route.post("/login", async (req, res) => {
        try {
            const { nickname, password } = req.body;
            if (!nickname || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Enter nickname Or password",
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
                    message: "Incorrect Password",
                });
            }
            //geting user's id
            const user_id = userResult.data._id;
            //making token , saving cookie
            const accessToken = jwtUtil.generateAccessToken(nickname, user_id);
            const refreshToken = jwtUtil.generateRefreshToken(
                nickname,
                user_id
            );
            return res.status(200).json({
                success: true,
                message: "login success" + accessToken + refreshToken,
                data: userResult.nickname,
            });
        } catch (err) {
            console.log("Error", err);
            return res.status(400).json({
                success: false,
                message: "Error in Server",
            });
        }
    });
};
