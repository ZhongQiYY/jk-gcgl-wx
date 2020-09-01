const app = getApp();
// const RootPath = "http://localhost:16000";
const RootPath = "https://telecom1.xizinet.com:4433";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jzsgt:[],
    RootPath: RootPath
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

  //查询接口，onshow中调用
  getJzsgt: function(){
    console.log("调用getJzsgt");
    var that = this;
    wx.request({
      url: RootPath + "/jk-gcgl/api/tzwj/pmTzwj/jzsgt?pId="+12, //请求路径
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
          var qq = res.data.data.split(',')
          console.log(qq)
          if (res.data.code == 200) {
            that.setData({
              jzsgt: res.data.data.split(','),
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            });
            console.log("finish.js getJzsgt() error res:----->>>>");
            console.log(res);
          }
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getJzsgt();
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