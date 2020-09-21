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
      url: '/pages/control/tjtptx/gylh/lcgc/tfgc/tfgc'
    })

  },

  /**
   * 园路整形
   */
  toDetailsAndJps: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/lcgc/ylzx/ylzx'
    })
  },

   /**
   * 园路铺装
   */
  toDetailsAndLhzz: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/lcgc/ylpz/ylpz'
    })
  },

  /**
   * 道路整形
   */
  toDetailsAndJgxp: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/lcgc/dlzx/dlzx'
    })
  },

  /**
   * 道路硬化
   */
  toDetailsAndLdzm: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/lcgc/dlyh/dlyh'
    })
  },

  /**
   * 停车(广)场整形
   */
  toDetailsAndJkzn: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/lcgc/tcczx/tcczx'
    })
  },

   /**
   * 停车(广)场铺装
   */
  toDetailsAndLxgc: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/lcgc/tccpz/tccpz'
    })
  },
})