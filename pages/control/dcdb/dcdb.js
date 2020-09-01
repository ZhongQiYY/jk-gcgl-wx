const app = getApp();
// const RootPath = "https://telecom1.xizinet.com:4433/jk-gcgl";
var basePath = app.globalData.basePath;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    records:[],
  },

  toDetails: function(obj) {
    let content = obj.currentTarget.dataset.content
    wx.navigateTo({
      url: '/pages/control/dcdb/details/details?content=' + content,
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecords();
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

  getRecords: function(){
    var that = this;
    wx.request({
      url: basePath + "/api/db/pmDb/list?pId="+14, //请求路径
      method: 'post',
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success (res) {
        if (res.statusCode == 200) {
          console.log(res.data);
          if (res.data.code == 200) {
            that.setData({
              records: res.data.data,
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            });
            console.log("dcdb.js getRecords() error res:----->>>>");
            console.log(res);
          }
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  add: function(obj){
    wx.navigateTo({
      url: '/pages/control/dcdb/add/add',
    })
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

  del: function(event){
      console.log(event);
      let id = event.target.dataset.id;
      console.log(id);
    var that = this;
      // 调用接口数据
    wx.request({
      //后台接口
      url: basePath + '/api/db/pmDb/delete?id='+id,
      method: 'POST',
      data: {
        id : id
      },
      header:{
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success: function(res) {
        console.log(res);
        if (res && res.data.code == 200) {
          that.getRecords();
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
      }
    });
  }
})