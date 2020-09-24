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
      url: '/pages/control/tjtptx/szql/jpsgc/tfgc/tfgc'
    })

  },

  /**
   * 支护工程
   */
  toDetailsAndJps: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/jpsgc/gckw/gckw'
    })
  },

   /**
   * 基础工程
   */
  toDetailsAndLhzz: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/jpsgc/jcdc/jcdc'
    })
  },

  /**
   * 桥台（涵）工程
   */
  toDetailsAndJgxp: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/jpsgc/gdaz/gdaz'
    })
  },

  /**
   * 桥梁工程
   */
  toDetailsAndLdzm: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/jpsgc/gdbf/gdbf'
    })
  },

  /**
   * 桥面工程
   */
  toDetailsAndJkzn: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/jpsgc/gdts/gdts'
    })
  },

   /**
   * 装饰工程
   */
  toDetailsAndLxgc: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/jpsgc/gdtt/gdtt'
    })
  },
})