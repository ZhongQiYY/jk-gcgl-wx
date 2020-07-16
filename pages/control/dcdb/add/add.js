// pages/control/dcdb/add/add.js
// var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-7-15',
    startYear: 2000,
    endYear: 2050
  },

  changeDate(e){
     this.setData({ date:e.detail.value});
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

  formSubmit(event) {
    console.log(event)
    let requestData = event.detail.value
    // 调用接口数据
    wx.request({
      url: 'url',
      method: 'GET',
      data: requestData,
      success: function(res) {
        if (res && res.code == 200) {
          wx.navigateBack()
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg,
          })
        }
      }
    })
    //
  }
})