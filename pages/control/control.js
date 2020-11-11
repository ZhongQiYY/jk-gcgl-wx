const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allRedDotNum: {},
    haveNameList: false,
    notShowLimit: false,
  },

  onShow: function () {
    var that = this;
    if(app.globalData.hasUserInfo && app.globalData.userInfo.state == 1){
        this.setData({
          notShowLimit: true
        });
    }else{
      that.setData({
        notShowLimit: false
      })
    }
    var list = app.globalData.projectNameList;
    if(list.length <= 0 && !that.data.haveNameList && app.globalData.hasUserInfo && app.globalData.userInfo.state == 1){
      request.post(requestUrl.nameList, {}).then(res => {
        app.globalData.projectNameList = res.data.projectNameList;
        app.globalData.projectNameListByCategory = res.data.projectNameListByCategory;  
        that.setData({
          haveNameList: true
        })
      }).catch(err => {
        
      })
    }

    // 获取所有红点数
    that.getAllRedDotNum();
  },

  // 获取所有红点数
  getAllRedDotNum: function(){
    var that = this;
    request.post(requestUrl.getAllRedDotNum, {}).then(res => {
      that.setData({
        allRedDotNum: res.data
      })
    }).catch(err => {})
  },


  toXmxx: function () {
    wx.navigateTo({
      url: '/pages/control/txxmxx/txxmxx',
    })
  },
  toAqjc: function () {
    wx.navigateTo({
      url: '/pages/control/tjaqjc/tjaqjc',
    })
  },
  toZljc: function () {
    wx.navigateTo({
      url: '/pages/control/tjzljc/tjzljc',
    })
  },
  toDbsx: function () {
    wx.navigateTo({
      url: '/pages/control/tjdbsx/tjdbsx',
    })
  },
  toQzsp: function () {
    wx.navigateTo({
      url: '/pages/control/tjqzsp/tjqzsp',
    })
  },
  toHtgl: function () {
    wx.navigateTo({
      url: '/pages/control/tjhtgl/tjhtgl',
    })
  },
  toTzwj: function () {
    wx.navigateTo({
      url: '/pages/control/tjtzwj/tjtzwj',
    })
  },
  toTptx: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/tjtptx',
    })
  },
  toWtjy: function () {
    wx.navigateTo({
      url: '/pages/control/tjwtjy/tjwtjy',
    })
  },
  toSjbsc: function () {
    wx.navigateTo({
      url: '/pages/control/sjbsc/sjbsc',
    })
  },

  toZjxx: function () {
    wx.navigateTo({
      url: '/pages/control/tjzjxx/tjzjxx',
    })
  },

  toGqxx: function() {
    wx.navigateTo({
      url: '/pages/control/tjgqxx/tjgqxx',
    })
  }

})