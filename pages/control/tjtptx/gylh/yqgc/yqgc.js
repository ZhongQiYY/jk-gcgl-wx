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
   * 地形造型
   */
  toDetailsAndDxzx: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/yqgc/dxzx/dxzx'
    })
  },

  /**
   * 给排水
   */
  toDetailsAndJps: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/yqgc/jps/jps'
    })
  },

   /**
   * 绿化种植
   */
  toDetailsAndLhzz: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/yqgc/lhzz/lhzz'
    })
  },

  /**
   * 景观小品
   */
  toDetailsAndJgxp: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/yqgc/jgxp/jgxp'
    })
  },

  /**
   * 路灯照明
   */
  toDetailsAndLdzm: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/yqgc/ldzm/ldzm'
    })
  },

  /**
   * 监控智能
   */
  toDetailsAndJkzn: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/yqgc/jkzn/jkzn'
    })
  },

   /**
   * 零星工程
   */
  toDetailsAndLxgc: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/yqgc/lxgc/lxgc'
    })
  },
})