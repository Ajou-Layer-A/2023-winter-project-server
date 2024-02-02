const Router = require("express");
const users = require("../routes/users");
module.exports = () => {
    const app = Router();
    app.get("/", (req, res) => {
        res.send("ok");
    });
    users(app);
    return app;
};
