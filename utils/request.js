// wx.request封装
const request = (options) => {
  const app = getApp();
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.basePath + options.url, //请求路径
      method: options.method,
      data: options.data,
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        if(res.data.code === 200){
          resolve(res.data);
        }else{
          console.log(res.data);
          reject(res.data);
        }
      },
      fail(err){
        wx.showToast({
          title: 'fail：请求中断，后台服务器或未启动',
          icon: 'none',
          duration: 3000
        })
        reject(err);
      }
    });
  })
}
//封装get方法
const get = (url, data) => {
  return request({
    url: url,
    method: 'GET',
    data: data
  })
}
//封装post方法
const post = (url, data) => {
  return request({
    url: url,
    method: 'POST',
    data: data
  })
}
//封装put方法
const put = (url, data) => {
  return request({
    url: url,
    method: 'PUT',
    data: data
  })
}
//封装remove方法
// 不能声明DELETE（关键字）
const del = (url, data) => {
  return request({
    url: url,
    method: 'DELETE',
    data: data
  })
}
//抛出wx.request的post,get,put,remove方法
module.exports = {
  get,
  post,
  put,
  del
}