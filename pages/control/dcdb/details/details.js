// pages/control/dcdb/details/details.js
var basePath = app.globalData.basePath;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      db:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.db.content = options.content
    this.setData({
      db: this.data.db
    })
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
      this.getDbDetails();
  },

  getDbDetails(){
    // var that = this;
    // //请求当月的加班记录
    // wx.request({
    //   url: "http://localhost:16000/gcgl/pmDb/list", //请求路径
    //   method: 'GET',
    //   data: {
    //     db: this.data.content,     
    //   },
    //   header: {
    //     'content-type': 'application/json', // 默认值
    //   },
    //   success (res) {
    //     if (res.statusCode == 200) {
    //       if (res.data.code == 200) {
    //         console.log(res.data);
    //         }
    //         console.log(res.data);
    //         that.setData({
    //           currentRecord:res.data.data,
    //         })
    //       }else{
    //         wx.showToast({
    //           title: res.data.msg,
    //           icon: 'success',
    //           duration: 1000
    //         });
    //         console.log(res);
    //       }
    //     }
    //   });
    
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