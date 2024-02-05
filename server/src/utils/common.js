const uuid = require("uuid");

/**
 * 스키마에 저장할 때 한국 시간으로 저장하기 위한 함수
 * @returns {Date} 한국 시간을 반환합니다.
 */
function getKorDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(
        Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
    );
}
/**
 * 정규 표현식 특수문자 처리
 * @param {string} str
 * @returns
 */
const escapeRegexChars = (str) => {
    const specialCharsPattern = /[-\/\\^$*+?.()|[\]{}]/g;
    return str.replace(specialCharsPattern, "\\$&");
};

/**
 * 고유한 파일 이름 생성
 * @param {*} fileName
 * @returns 고유한 파일 이름
 */
const generateUniqueFileName = (name) => {
    const uniqueId = uuid.v4();
    const fileName = `${uniqueId}_${name}`;
    return fileName;
};

module.exports = { getKorDate, escapeRegexChars, generateUniqueFileName };
