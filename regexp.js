/**
 * @description 判断是否为网址
 * @author 未知
 */

function isURL(strUrl) {
    var regular = /^(((https?|ftp|rtsp|mms):\/\/)?[-a-z0-9_]+(\.[-a-z0-9_]+)*\.(?:[a-z]{2,6}|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(:[0-9]{1,4})?(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }else {
        return false;
    }
}