const postModel = require("../../models/Post");
const config = require("../../config/index");

/**
 * @param user_id
 * @param postData
 * @returns 성공여부
 */
const savePostData = async (id, postData) => {
    try {
        const savePostData = new postModel({
            title: postData.title,
            user_id: id,
            category: postData.category,
            content: postData.content,
        });

        const result = await savePostData.save();
        if (!result) {
            return {
                success: false,
                message: "Post 정보 저장에 실패했습니다.",
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
    savePostData,
};

// Refresh
