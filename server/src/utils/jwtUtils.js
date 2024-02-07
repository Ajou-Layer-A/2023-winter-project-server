const jwt = require("jsonwebtoken");
const config = require("../config/index.js");
const secureOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
};
module.exports = {
    /**
     * @param {string} nickname
     * @returns Access Token 발급
     */
    generateAccessToken: (nickname, user_id) => {
        const payload = {
            nickname: nickname,
            user_id: user_id,
        };

        return jwt.sign(
            payload,
            config.jwt.jwtSecret,
            {
                expiresIn: "15m", //만료시간
                algorithm: "HS256", //암호화 알고리즘
                issuer: config.jwt.isu, //발행자
                audience: config.jwt.aud, //발행 대상
                //isAdmin: false,
            },
            secureOptions
        );
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

        return jwt.sign(
            payload,
            config.jwt.jwtRefreshSecret,
            {
                expiresIn: "7d",
                algorithm: "HS256",
                issuer: config.jwt.isu,
                audience: config.jwt.aud,
                subject: "auth",
            },
            secureOptions
        );
    },

    /**
     * @param {string} token
     * @returns result
     */
    verify: (token) => {
        //access토큰 검증
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
