const authUtils = require("../../utils/jwtUtils");
const jwt = require("jsonwebtoken");
const config = require("../../config/index.js");

// router에서 만약 토큰이 없다면 401을 반환하고, 토큰이 있다면 verify를 통해 토큰을 확인합니다. 그리고 next()를 통해 다음 미들웨어로 넘어갑니다.
/**
 * @param {string} token
 * @returns result
 */
const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "not logged in",
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
