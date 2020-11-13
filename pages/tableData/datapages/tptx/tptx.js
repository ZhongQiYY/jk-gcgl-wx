const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectId: "", 
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
   * 房建类
   */
  toDetailsAndFjl: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/fjl/fjl'
    })
  },
  /**
   * 公园绿化类
   */
  toDetailsAndGylhl: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/gylh/gylh'
    })
  },

  /**
   * 市政桥梁类
   */
  toDetailsAndSzqll: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/szql/szql'
    })
  },
})