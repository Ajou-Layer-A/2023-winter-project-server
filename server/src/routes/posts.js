const Router = require("express");
const postsController = require("../services/client/postsController");
const jwtUtil = require("../utils/jwtUtils");
const isAuth = require("../api/middlewares/isAuth");
const route = Router();
const config = require("../config/index");
module.exports = (app) => {
    app.use("/posts", route);
    route.get("/delete/:post_id", isAuth, async (req, res) => {
        const post_id = req.params.post_id;
        if (!post_id) {
            return res.status(400).json({
                success: false,
                message: "필수 입력값이 없습니다.",
            });
        }
    });

    /**
     * 게시글 저장
     * @route POST /posts/create
     * @param {*} title
     * @param {*} category
     */
    route.post("/create", isAuth, async (req, res) => {
        const postData = req.body;
        if (!postData.title || !postData.category) {
            return res.status(400).json({
                success: false,
                message: "Please give me Post Info",
            });
        }
        //save Post data
        const user_id = req.decoded.user_id;
        const savePostResult = await postsController.savePostData(
            user_id,
            postData
        );
        if (!savePostResult.success) {
            return res.status(400).json({
                success: false,
                message: "Save ERR" + savePostResult.message,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: savePostResult,
            });
        }
    });
};
