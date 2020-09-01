// pages/tableData/datapages/sjtj/jsjdb/jsjdb.js
var app = getApp();
var basePath = app.globalData.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeInfo: {},
    categoryType: 0
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
    this.setData({
      categoryType: app.globalData.categoryType
    })
    wx.request({
      url: basePath+"/api/project/projectScheduleInfo", //请求路径
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
        that.setData({
          timeInfo: res.data
        });
        console.log(that.data.timeInfo);
      }
    });
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