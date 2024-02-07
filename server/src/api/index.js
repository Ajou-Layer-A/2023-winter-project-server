const Router = require("express");
const users = require("../routes/users");
const posts = require("../routes/posts");
module.exports = () => {
    const app = Router();
    app.get("/", (req, res) => {
        res.send("ok");
    });
    users(app);
    posts(app);
    return app;
};
