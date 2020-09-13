// pages/tableData/datapages/sjtj/sjtj.js
var app = getApp();
var basePath = app.globalData.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: basePath+"/api/project/projectBaseInfo", //请求路径
      method: 'post',
      data: {
        projectId: app.globalData.projectId,
        categoryType: app.globalData.categoryType
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success (res) {
        app.globalData.projectBaseInfo = res.data;
      }
    });
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

  toGcbb: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/sjtj/gcbb/gcbb',
    })
  },

  toZtqkb: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/sjtj/ztqkb/ztqkb',
    })
  },

  toJjjszbb: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/sjtj/jjjszbb/jjjszbb',
    })
  },

  toJsjdb: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/sjtj/jsjdb/jsjdb',
    })
  },

  toXmfxt: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/sjtj/xmfxt/xmfxt',
    })
  },
})