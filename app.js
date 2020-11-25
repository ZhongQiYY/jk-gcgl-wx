var requestUrl = require('./api/api.js');
var request = require('./utils/request.js');

const RootPath = "http://localhost:16000/jk-gcgl";
// const RootPath = "https://test.xizinet.com/jk-gcgl";
// const RootPath = "https://gcgl.xizinet.com/jk-gcgl";
App({
globalData: {
  basePath: "http://localhost:16000/jk-gcgl",
  // basePath: "https://test.xizinet.com/jk-gcgl",
  // basePath: "https://gcgl.xizinet.com/jk-gcgl",

  imageRootPath: "https://gcgl.xizinet.com",
  // imageRootPath: "https://test.xizinet.com",
  // imageRootPath: "https://telecom1.xizinet.com:4433",
  projectName: "",//全局项目名称
  projectId: 0,//全局项目id
  categoryType: 0,//全局项目类型

  requestUrl: requestUrl,//请求的url
  request: request,//封装的请求模板

  pId: 0,//全局项目id --操作台使用
  pName: "",//全局项目名称 --操作台使用
  cType: 0,//全局项目类型 --操作台使用
  
  clickLoginBtn: false,//点击了微信登录后会修改一次值

  projectNameList:[],//名称集合，所有项目名称，用于搜索框搜索项目
  projectNameListByCategory:[],//名称集合，所有项目名称以项目类别为组分好

  projectBaseInfo: {},//用于数据统计内展示统计信息
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
  },

  submittedList:[], // 安全检查已提交
  replyList:[], // 安全检查整改回复
  agreeList:[], // 安全检查同意
  disagreeList:[], // 安全检查不同意

  submittedQualityList:[], // 质量检查已提交
  replyQualityList:[], // 质量检查整改回复
  agreeQualityList:[], // 质量检查同意
  disagreeQualityList:[] // 质量检查不同意
},

onLaunch(){
  let that = this;
  that.checkUpdateVersion();
},

/**
 * 检测当前的小程序
 * 是否是最新版本，是否需要下载、更新
 */
checkUpdateVersion() {
  //判断微信版本是否 兼容小程序更新机制API的使用
  if (wx.canIUse('getUpdateManager')) {
    //创建 UpdateManager 实例
    const updateManager = wx.getUpdateManager();
    //检测版本更新
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        //监听小程序有版本更新事件
        updateManager.onUpdateReady(function() {
          //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
          updateManager.applyUpdate();
        })
        updateManager.onUpdateFailed(function() {
          // 新版本下载失败
          wx.showModal({
            title: '已经有新版本喽~',
            content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
          })
        })
      }
    })
  } else {
    //TODO 此时微信版本太低（一般而言版本都是支持的）
    wx.showModal({
      title: '溫馨提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
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
      typeof fail == 'function' && fail();
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
              page.globalData.userInfo = res.data.data;
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