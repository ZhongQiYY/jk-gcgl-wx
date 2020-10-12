
// 获取年月日时分秒
function getymdhms(date, ymdSeparator, hmsSeparator) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
 
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
 
  return [year, month, day].map(formatNumber).join(ymdSeparator) + ' ' + [hour, minute, second].map(formatNumber).join(hmsSeparator)
}

// 获取年月日
function getymd(date, ymdSeparator) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
 
  return [year, month, day].map(formatNumber).join(ymdSeparator)
}
 
// [].map(function (e){})方法会遍历每一个数组内的元素进入该方法，经过计算形成新的数组
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
 
module.exports = {
  getymdhms: getymdhms,
  getymd: getymd
}