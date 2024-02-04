const UserModel = require("../../models/user");
const config = require("../../config/index");
// 사용자 회원가입 시 필요한 것들
/**
 * @param {string} nickName
 * @returns 성공여부
 */

const setClientTokenCookie = async (res, accessToken, refreshToken) => {
    // access token을 쿠키에 저장
    res.cookie("clientAccessToken", accessToken);
    // refresh token을 쿠키에 저장
    res.cookie("clientRefreshToken", refreshToken);
    if (!res.cookie) {
        return {
            success: false,
            message: "Saving cookie fault",
        };
    }
    return {
        success: true,
    };
};

const checkNickName = async (nickName) => {
    try {
        const result = await UserModel.findOne({ nickname: nickName });
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
};

/**
 * @param {string} address
 * @returns 성공여부
 */
const saveUserData = async (userData) => {
    try {
        const result = await UserModel.create(userData);
        if (!result) {
            return {
                success: false,
                message: "사용자 정보 저장에 실패했습니다.",
            };
        }
        return {
            success: true,
            data: result,
        };
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
};

/**
 * 사용자 지갑 주소 저장 및 업데이트
 * @param {string} nickName
 * @param {string} address
 * @returns 성공 여부
 */
const saveUserWalletAddress = async (nickName, address) => {
    try {
        const result = await UserModel.findOneAndUpdate(
            { nickname: nickName },
            { address: address }
        );
        if (!result) {
            return {
                success: false,
                message: "사용자 정보 저장에 실패했습니다.",
            };
        }
        return {
            success: true,
            data: result,
        };
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
};

/**
 * 사용자 정보 조회
 * @param {string} nickName
 * @returns 사용자 정보
 */
const getUserInfo = async (nickName) => {
    try {
        const result = await UserModel.findOne({ nickname: nickName });
        if (!result) {
            return {
                success: false,
                message: "사용자 정보 조회에 실패했습니다.",
            };
        }
        return {
            success: true,
            data: result,
        };
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
};

module.exports = {
    checkNickName,
    saveUserData,
    saveUserWalletAddress,
    getUserInfo,
    setClientTokenCookie,
};
