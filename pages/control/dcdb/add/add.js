const app = getApp();
var dateTimePicker = require('../../../../utils/dateTimePicker.js');
var basePath = app.globalData.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
  },

  changeDateTime(e){
    console.log(e)
    this.setData({ dateTime: e.detail.value });
  },

  changeDateTimeColumn(e){
    var arr = this.data.dateTime,
    dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
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

  formSubmit(event) {
    console.log(event)
    let requestData = event.detail.value
    // 调用接口数据
    wx.request({
      //后台接口
      url: basePath + '/api/db/pmDb/insert',
      method: 'POST',
      data: requestData,
      header:{
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success: function(res) {
        console.log(res)
        if (res && res.data.code == 200) {
          wx.navigateBack()
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
      }
    });
    //
  }
})