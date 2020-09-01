// pages/tableData/tableData.js
var app = getApp();
Page({

  mixins: [require('../../dist/mixin/themeChanged')],

  /**
   * 页面的初始数据
   */
  data: {
    projectName: ""
  },

  toPlan: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/annualplan/annualplan',
    })
  },

  toDb: function() {
    wx.navigateTo({
      url: '/pages/control/dcdb/dcdb',
    })
  },

  toSwInstruction: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tzwj/tzwj',
    })
  },

  toHtgl: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/htgl/htgl',
    })
  },

  toTptx: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/tptx',
    })
  },

  toZjjk: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/zjjk/zjjk',
    })
  },
 
  toSjtj: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/sjtj/sjtj',
    })
  },













  // -------生命周期函数---------
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
    this.setData({
      projectName: app.globalData.pName
    })
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

  }
})