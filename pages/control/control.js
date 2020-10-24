// pages/control/control.js
const app = getApp();
var basePath = app.globalData.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveNameList: false,
    notShowLimit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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
      wx.request({
        url: basePath+"/api/project/nameList", //请求路径
        method: 'post',
        data: {
          
        },
        header: {
          'content-type': 'application/json', // 默认值
          'thirdSession': app.globalData.thirdSession
        },
        success (res) {
          app.globalData.projectNameList = res.data  
          that.setData({
            haveNameList: true
          })
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toJdxx: function () {
    wx.navigateTo({
      url: '/pages/control/txjdxx/txjdxx',
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
})