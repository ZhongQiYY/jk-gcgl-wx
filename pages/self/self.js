//获取应用实例
const app = getApp()
Page({

  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  selfInfo: function () {
    wx.navigateTo({
      url: 'info/info', 
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    const page = this;
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo);
      app.userInfoSetInSQL(e.detail.userInfo, function () {
        console.log('callback');
        page.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: app.globalData.hasUserInfo
        });
        if (page.data.userInfo.name == null ||
           page.data.userInfo.name == ''||
           page.data.userInfo.company == null || 
           page.data.userInfo.company == '') {
          wx.navigateTo({
            url: 'info/info',
          })
        }
      });
    }
  },


  onLoad: function (options) {
    this.setData({
      scrollViewHeight: wx.getSystemInfoSync().windowHeight,
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('---------------------------')
    console.log(app.globalData.userInfo)
    this.setData({
      scrollViewHeight: wx.getSystemInfoSync().windowHeight,
      userInfo: app.globalData.userInfo,
      hasUserInfo:  app.globalData.hasUserInfo
    });
    setTimeout(() => {
      this.onLoad();
    }, 1000);
  }
  
})