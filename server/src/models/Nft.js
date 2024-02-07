const mongoose = require("mongoose");
const { getKorDate } = require("../utils/common");

const nftSchema = new mongoose.Schema({
    token_id: {
        // 토큰 ID
        type: Number,
        required: true,
    },
    user_id: {
        // 사용자 ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        //변동 가능
        type: String,
        required: true,
    },
    description: {
        //변동 가능
        type: String,
        default: "",
    },
    token_uri: {
        //변동 가능
        type: String,
        required: true,
    },
    created_at: {
        // DNFT 정보 생성일
        type: Date,
        default: getKorDate,
    },
    updated_at: {
        // DNFT 정보 수정일
        type: Date,
        default: getKorDate,
    },
    price: {
        //NFT 가격
        type: Number,
        required: true,
    },
});

const NFT = mongoose.model("nft", nftSchema);
module.exports = NFT;
