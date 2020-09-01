const app = getApp();
// const RootPath = "http://localhost:16000";
const RootPath = "https://telecom1.xizinet.com:4433";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmSzqll:{},
    qhgcTfgcAfterImgUrl: [], 
    qhgcTfgcBeforeImgUrl: [], 
    qhgcTfgcMidImgUrl: [], 

    qhgcZhgcAfterImgUrl: [], 
    qhgcZhgcBeforeImgUrl: [], 
    qhgcZhgcMidImgUrl: [],

    qhgcJcgcAfterImgUrl: [], 
    qhgcJcgcBeforeImgUrl: [], 
    qhgcJcgcMidImgUrl: [], 

    qhgcQtgcAfterImgUrl: [], 
    qhgcQtgcMidImgUrl: [], 
    qhgcQtgcBeforeImgUrl: [], 

    qhgcQlgcAfterImgUrl: [], 
    qhgcQlgcBeforeImgUrl: [], 
    qhgcQlgcMidImgUrl: [], 

    qhgcQmgcAfterImgUrl: [], 
    qhgcQmgcBeforeImgUrl: [], 
    qhgcQmgcMidImgUrl: [], 

    qhgcZsgcAfterImgUrl: [], 
    qhgcZsgcBeforeImgUrl: [], 
    qhgcZsgcMidImgUrl: [], 
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
  getSzqll: function(){
    console.log("调用getYqgc");
    var that = this;
    wx.request({
      url: RootPath + "/jk-gcgl/api/tptx/pmTptx/szqll?pId="+14, //请求路径
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
              pmSzqll: res.data.data,
              qhgcTfgcAfterImgUrl : res.data.data.qhgcTfgcAfterImgUrl.split(","),
              qhgcTfgcBeforeImgUrl : res.data.data.qhgcTfgcBeforeImgUrl.split(","),
              qhgcTfgcMidImgUrl : res.data.data.qhgcTfgcMidImgUrl.split(","),

              qhgcZhgcAfterImgUrl : res.data.data.qhgcZhgcAfterImgUrl.split(","),
              qhgcZhgcBeforeImgUrl : res.data.data.qhgcZhgcBeforeImgUrl.split(","),
              qhgcZhgcMidImgUrl : res.data.data.qhgcZhgcMidImgUrl.split(","),

              qhgcJcgcAfterImgUrl : res.data.data.qhgcJcgcAfterImgUrl.split(","),
              qhgcJcgcBeforeImgUrl :  res.data.data.qhgcJcgcBeforeImgUrl.split(","),
              qhgcJcgcMidImgUrl : res.data.data.qhgcJcgcMidImgUrl.split(","),

              qhgcQtgcAfterImgUrl : res.data.data.qhgcQtgcAfterImgUrl.split(","),
              qhgcQtgcMidImgUrl : res.data.data.qhgcQtgcMidImgUrl.split(","),
              qhgcQtgcBeforeImgUrl : res.data.data.qhgcQtgcBeforeImgUrl.split(","),

              qhgcQlgcAfterImgUrl : res.data.data.qhgcQlgcAfterImgUrl.split(","),
              qhgcQlgcBeforeImgUrl : res.data.data.qhgcQlgcBeforeImgUrl.split(","),
              qhgcQlgcMidImgUrl : res.data.data.qhgcQlgcMidImgUrl.split(","),

              qhgcQmgcAfterImgUrl : res.data.data.qhgcQmgcAfterImgUrl.split(","),
              qhgcQmgcBeforeImgUrl : res.data.data.qhgcQmgcBeforeImgUrl.split(","),
              qhgcQmgcMidImgUrl : res.data.data.qhgcQmgcMidImgUrl.split(","),

              qhgcZsgcAfterImgUrl : res.data.data.qhgcZsgcAfterImgUrl.split(","),
              qhgcZsgcBeforeImgUrl : res.data.data.qhgcZsgcBeforeImgUrl.split(","),
              qhgcZsgcMidImgUrl : res.data.data.qhgcZsgcMidImgUrl.split(","),

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
    that.getSzqll();
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