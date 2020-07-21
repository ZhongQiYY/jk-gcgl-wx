//app.js
//获取应用实例
const app = getApp();
const RootPath = "http://localhost:16000/jk-gcgl";
App({
// -------------------- 存储共享数据区域 --------------------
globalData: {
  pName: "",
  userInfo: {},
  hasUserInfo: false,
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
  thirdSession: null,
  userKey: "third_session",

  url: {
    userInfo:  RootPath+"/api/wechat/userInfo",
    userData:  RootPath+"/api/wechat/userData",
  }
},



// -------------------- 小程序进入场景处理(一般与生命周期函数共同使用) --------------------


// -------------------- 监听生命周期区域 --------------------


})