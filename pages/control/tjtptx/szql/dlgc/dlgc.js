// pages/tableData/datapages/tptx/tptx.js
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

  /**
   * 土方工程
   */
  toDetailsAndDxzx: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/dlgc/tfgc/tfgc'
    })

  },

  /**
   * 支护工程
   */
  toDetailsAndJps: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/dlgc/ljcl/ljcl'
    })
  },

   /**
   * 基础工程
   */
  toDetailsAndLhzz: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/dlgc/ljgc/ljgc'
    })
  },

  /**
   * 桥台（涵）工程
   */
  toDetailsAndJgxp: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/dlgc/jcjaz/jcjaz'
    })
  },

  /**
   * 桥梁工程
   */
  toDetailsAndLdzm: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/dlgc/ywsg/ywsg'
    })
  },

  /**
   * 桥面工程
   */
  toDetailsAndJkzn: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/dlgc/jgjc/jgjc'
    })
  },

   /**
   * 装饰工程
   */
  toDetailsAndLxgc: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/dlgc/jgmc/jgmc'
    })
  },
})