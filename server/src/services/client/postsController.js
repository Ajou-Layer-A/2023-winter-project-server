const postModel = require("../../models/Post");
const config = require("../../config/index");

/**
 * post delete
 * @param post_id
 * @returns 성공여부
 */
const deletePost = async (postId) => {
    try {
        const result = await postModel.deleteOne({ _id: postId });
        if (!result) {
            return { success: false };
        } else {
            return { success: true };
        }
    } catch (err) {
        console.error("Error:" + err);
        throw Error(err);
    }
};

/**
 * post create
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
    deletePost,
};

// Refresh
