const mongoose = require("mongoose");
const { getKorDate } = require("../utils/common");
/**
 * Posts Collection Schema
 */
const postSchema = new mongoose.Schema({
    user_id: {
        // users collection의 _id를 참조
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    image: {
        //NFT 이미지
        type: String,
        ref: "nft",
    },
    category: {
        //Buy(0) || Sell(1)
        type: Boolean,
        required: true,
    },
    title: {
        // 게시글 제목
        type: String,
        required: true,
    },
    content: {
        // 게시글 내용
        type: String,
    },
    view: {
        count: {
            // 조회수
            type: Number,
            default: 0,
        },
        viewers: {
            // 조회자
            type: Array,
        },
    },
    created_at: {
        // 게시글 생성일
        type: Date,
        default: getKorDate,
    },
    updated_at: {
        // 게시글 수정일
        type: Date,
        default: getKorDate,
    },
});

const Posts = mongoose.model("post", postSchema);
module.exports = Posts;
