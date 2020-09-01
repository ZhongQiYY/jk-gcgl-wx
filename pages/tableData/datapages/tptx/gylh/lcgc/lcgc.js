const app = getApp();
// const RootPath = "http://localhost:16000";
const RootPath = "https://telecom1.xizinet.com:4433";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmGylhl:{},
    lcgcTfgcAfterImgUrl: [], 
    lcgcTfgcBeforeImgUrl: [], 
    lcgcTfgcMidImgUrl: [], 

    lcgcYlzxAfterImgUrl: [], 
    lcgcYlzxBeforeImgUrl: [], 
    lcgcYlzxMidImgUrl: [],

    lcgcYlpzAfterImgUrl: [], 
    lcgcYlpzBeforeImgUrl: [], 
    lcgcYlpzMidImgUrl: [], 

    lcgcDlzxAfterImgUrl: [], 
    lcgcDlzxMidImgUrl: [], 
    lcgcDlzxBeforeImgUrl: [], 

    lcgcDlyhAfterImgUrl: [], 
    lcgcDlyhBeforeImgUrl: [], 
    lcgcDlyhMidImgUrl: [], 

    lcgcTcczxAfterImgUrl: [], 
    lcgcTcczxBeforeImgUrl: [], 
    lcgcTcczxMidImgUrl: [], 

    lcgcTccpzAfterImgUrl: [], 
    lcgcTccpzBeforeImgUrl: [], 
    lcgcTccpzMidImgUrl: [], 
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
  getYqgc: function(){
    console.log("调用getYqgc");
    var that = this;
    wx.request({
      url: RootPath + "/jk-gcgl/api/tptx/pmTptx/gylhl?pId="+14, //请求路径
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
          var qq = res.data.data
          console.log(qq)
          if (res.data.code == 200) {
            that.setData({
              pmGylhl: res.data.data,
              lcgcTfgcAfterImgUrl : res.data.data.lcgcTfgcAfterImgUrl.split(","),
              lcgcTfgcBeforeImgUrl : res.data.data.lcgcTfgcBeforeImgUrl.split(","),
              lcgcTfgcMidImgUrl : res.data.data.lcgcTfgcMidImgUrl.split(","),

              lcgcYlzxAfterImgUrl : res.data.data.lcgcYlzxAfterImgUrl.split(","),
              lcgcYlzxBeforeImgUrl : res.data.data.lcgcYlzxBeforeImgUrl.split(","),
              lcgcYlzxMidImgUrl : res.data.data.lcgcYlzxMidImgUrl.split(","),

              lcgcYlpzAfterImgUrl : res.data.data.lcgcYlpzAfterImgUrl.split(","),
              lcgcYlpzBeforeImgUrl :  res.data.data.lcgcYlpzBeforeImgUrl.split(","),
              lcgcYlpzMidImgUrl : res.data.data.lcgcYlpzMidImgUrl.split(","),

              lcgcDlzxAfterImgUrl : res.data.data.lcgcDlzxAfterImgUrl.split(","),
              lcgcDlzxMidImgUrl : res.data.data.lcgcDlzxMidImgUrl.split(","),
              lcgcDlzxBeforeImgUrl : res.data.data.lcgcDlzxBeforeImgUrl.split(","),

              lcgcDlyhAfterImgUrl : res.data.data.lcgcDlyhAfterImgUrl.split(","),
              lcgcDlyhBeforeImgUrl : res.data.data.lcgcDlyhBeforeImgUrl.split(","),
              lcgcDlyhMidImgUrl : res.data.data.lcgcDlyhMidImgUrl.split(","),

              lcgcTcczxAfterImgUrl : res.data.data.lcgcTcczxAfterImgUrl.split(","),
              lcgcTcczxBeforeImgUrl : res.data.data.lcgcTcczxBeforeImgUrl.split(","),
              lcgcTcczxMidImgUrl : res.data.data.lcgcTcczxMidImgUrl.split(","),

              lcgcTccpzAfterImgUrl : res.data.data.lcgcTccpzAfterImgUrl.split(","),
              lcgcTccpzBeforeImgUrl : res.data.data.lcgcTccpzBeforeImgUrl.split(","),
              lcgcTccpzMidImgUrl : res.data.data.lcgcTccpzMidImgUrl.split(","),

            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            });
            console.log("finish.js getYqgc() error res:----->>>>");
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
    that.getYqgc();
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