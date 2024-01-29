const mongoose = require('mongoose');
const config = require('../config/index');
const bcrypt = require('bcrypt');
const { getKorDate } = require('../utils/common');

const userSchema = new mongoose.Schema({
  user_type: {
    // 사용자 권한
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  hashed_pw: {
    // 사용자 비밀번호 (해시)
    type: String,
    require: true,
  },
  nickname: {
    // 사용자 닉네임
    type: String,
    unique: true,
    required: true,
  },
  banner_img_url: {
    // 배너 이미지 URL
    type: String,
    default: '',
  },
  address: {
    // 사용자 지갑 주소
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    // 사용자 생성일
    type: Date,
    default: getKorDate,
  },
  updated_at: {
    // 사용자 정보 수정일
    type: Date,
    default: getKorDate,
  },
});

/**
 * 사용자 비밀번호 암호화 함수
 */
userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('hashed_pw')) {
    bcrypt.genSalt(config.saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.hashed_pw, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.hashed_pw = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/**
 * 사용자 비밀번호 비교 함수
 * @param {string} plainPW
 * @returns 일치 여부
 */
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.hashed_pw);
};

const Users = mongoose.model('user', userSchema);
module.exports = Users;
