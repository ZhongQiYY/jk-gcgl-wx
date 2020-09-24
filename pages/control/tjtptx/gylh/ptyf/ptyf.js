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
      url: '/pages/control/tjtptx/gylh/ptyf/tfgc/tfgc'
    })

  },

  /**
   * 基础工程
   */
  toDetailsAndJps: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/ptyf/jcgc/jcgc'
    })
  },

   /**
   * 主体工程
   */
  toDetailsAndLhzz: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/ptyf/ztgc/ztgc'
    })
  },

  /**
   * 装饰装修
   */
  toDetailsAndJgxp: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/ptyf/zszx/zszx'
    })
  },

  /**
   * 供水供电
   */
  toDetailsAndLdzm: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/ptyf/gsgd/gsgd'
    })
  },

  /**
   * 排水排污
   */
  toDetailsAndJkzn: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/ptyf/pspw/pspw'
    })
  },

   /**
   * 零星工程
   */
  toDetailsAndLxgc: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/ptyf/lxgc/lxgc'
    })
  },
})