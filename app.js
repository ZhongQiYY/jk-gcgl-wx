//app.js
//获取应用实例
const app = getApp();
const RootPath = "http://localhost:16000/jk-gcgl";
// const RootPath = "https://test.xizinet.com/jk-gcgl"
App({

// -------------------- 存储共享数据区域 --------------------
globalData: {
  basePath: "http://localhost:16000/jk-gcgl",
  // basePath: "https://test.xizinet.com/jk-gcgl",
  
  imageRootPath: "https://test.xizinet.com",
  // imageRootPath: "https://telecom1.xizinet.com:4433",
  pName: "",
  projectId: 0,
  categoryType: 0,
  projectNameList:[],
  projectBaseInfo: {},
  userInfo: {},
  hasUserInfo: false,
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
  thirdSession: null,
  userKey: "third_session",
  companies: [],
  url: {
    userInfo:  RootPath+"/api/wechat/userInfo",
    userData:  RootPath+"/api/wechat/userData",
    auth: RootPath+"/api/wechat/auth",
  }
},
userLogin: function (callback, fail) {
  const page = this;


  wx.checkSession({
    success: function () {
      console.log("checkSession未过期");
      //从app缓存中获取third_session，如果没有就执行onLogin()方法
      wx.getStorage({
        key: page.globalData.userKey,
        success: function (res) {
          console.log("checkSession -> getStorage 成功");
          page.globalData.thirdSession = res.data;
          page.getUserInfo(callback, fail);
        },
        fail: function (res) {
          console.log("checkSession -> getStorage 失败");
          page.onLogin(callback, fail);
        }
      })
    },
    fail: function () {
      console.log("checkSession已过期");
      page.onLogin();
    }
  })


},
onLogin: function (callback, fail) {
  const page = this;
  let promise = new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("onLogin成功");
          wx.request({
            url: page.globalData.url.auth,
            method: 'POST',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.statusCode == 200) {
                if (res.data.code == 200) {
                  console.log("auth成功");
                  wx.setStorage({
                    key: page.globalData.userKey,
                    data: res.data.data
                  });
                  console.log("setStorage保存成功");
                  page.globalData.thirdSession = res.data.data;
                  page.getUserInfo(callback, fail);
                } else {
                  page.showToast(res.data.msg + '\n' + '(错误码:' + res.data.code + ')');
                }
              } else {
                page.showToast('服务器繁忙，请稍后再试\n' + '(状态码:' + res.statusCode + ')');
              }
            },
            fail: function (res) {
              page.showToast('服务器繁忙，请稍后再试\n' + '(状态码:500)');
            }
          })
        }
      },
      fail: function (res) {
        page.showToast('服务器繁忙，请稍后再试\n' + '(状态码:wx500)');
      }
    })
  });
  return promise;
},
getUserInfo: function (callback, fail) {
  const page = this;
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        console.log("getUserInfo用户已授权");
        wx.getUserInfo({
          success: res => {
            console.log("获取getUserInfo成功");
            console.log(res.userInfo);
            console.log('用户数据');
            page.userInfoSetInSQL(res.userInfo, callback);
          },
          fail: function () {
            console.log("获取getUserInfo失败");
            page.showToast('服务器繁忙，请稍后再试\n' + '(状态码:wx501)');
          }
        })
      } else {
        // console.log(fail);
        typeof fail == 'function' && fail();
        console.log('getUserInfo用户未授权');
      }
    }
  })
},

userInfoSetInSQL: function (userInfo, callback) {
  const page = this;
  var obj = wx.getStorageSync(page.globalData.userKey)
  console.log(obj)
  var a = page.globalData.userKey;
  console.log(a)
  wx.getStorage({
    key: page.globalData.userKey,
    success: function (res) {
      console.log('userInfoSetInSQL -> wx.getStorage 成功 '+res.data);
      wx.request({
        url: page.globalData.url.userInfo,
        method: 'POST',
        data: {
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          gender: userInfo.gender,
          province: userInfo.province,
          city: userInfo.city,
          country: userInfo.country,
          language: userInfo.language,
          company: userInfo.company
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'thirdSession': res.data
        },
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.code == 200) {
              console.log('userinfo更新成功');
              console.log(userInfo)
              console.log(res.data);
              page.globalData.userInfo = userInfo;
              page.globalData.userInfo.name = res.data.data.name;
              page.globalData.userInfo.company = res.data.data.company;
              page.globalData.userInfo.state = res.data.data.state;
              page.globalData.userInfo.stateText = res.data.data.stateText;
              page.globalData.companies = res.data.data.companies;
              page.globalData.hasUserInfo = true;
              // page.loadData(false, callback);
              typeof callback == 'function' && callback();
            } else {
              page.showToast(res.data.msg + '\n' + '(错误码:' + res.data.code + ')');
            }
          } else {
            page.showToast('服务器繁忙，请稍后再试\n' + '(状态码:' + res.statusCode + ')');
          }
        }
      })
    },
    fail: function (e) {
      console.log(e)
      console.log('userInfoSetInSQL -> wx.getStorage 失败');
    }
  })
},
showToast: function (msg, icon, complete) {
  icon = typeof (icon) == 'undefined' ? 'none' : icon;
  wx.showToast({
    title: msg,
    icon: icon,
    mask: true,
    duration: 2000,
    complete: function (res) {
      typeof complete == 'function' ? complete(res) : false;
    }
  });
}
})