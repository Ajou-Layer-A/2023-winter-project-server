const Router = require("express");
const usersController = require("../services/client/usersController");
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
};
