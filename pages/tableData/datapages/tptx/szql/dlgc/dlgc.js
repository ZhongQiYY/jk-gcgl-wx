const app = getApp();
// const RootPath = "http://localhost:16000";
const RootPath = app.globalData.imageRootPath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmSzqll:{},
    dlgcTfgcAfterImgUrl: [], 
    dlgcTfgcBeforeImgUrl: [], 
    dlgcTfgcMidImgUrl: [], 

    dlgcLjclAfterImgUrl: [], 
    dlgcLjclBeforeImgUrl: [], 
    dlgcLjclMidImgUrl: [],

    dlgcLjgcAfterImgUrl: [], 
    dlgcLjgcBeforeImgUrl: [], 
    dlgcLjgcMidImgUrl: [], 

    dlgcJcjazAfterImgUrl: [], 
    dlgcJcjazMidImgUrl: [], 
    dlgcJcjazBeforeImgUrl: [], 

    dlgcYwsgAfterImgUrl: [], 
    dlgcYwsgBeforeImgUrl: [], 
    dlgcYwsgMidImgUrl: [], 

    dlgcJgjcAfterImgUrl: [], 
    dlgcJgjcBeforeImgUrl: [], 
    dlgcJgjcMidImgUrl: [], 

    dlgcJgmcAfterImgUrl: [], 
    dlgcJgmcBeforeImgUrl: [], 
    dlgcJgmcMidImgUrl: [], 
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
    console.log("getSzqll");
    var that = this;
    wx.request({
      url: RootPath + "/jk-gcgl/api/tptx/pmTptx/szqll?pId="+app.globalData.projectId, //请求路径
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
              dlgcTfgcAfterImgUrl : res.data.data.dlgcTfgcAfterImgUrl.split(","),
              dlgcTfgcBeforeImgUrl : res.data.data.dlgcTfgcBeforeImgUrl.split(","),
              dlgcTfgcMidImgUrl : res.data.data.dlgcTfgcMidImgUrl.split(","),

              dlgcLjclAfterImgUrl : res.data.data.dlgcLjclAfterImgUrl.split(","),
              dlgcLjclBeforeImgUrl : res.data.data.dlgcLjclBeforeImgUrl.split(","),
              dlgcLjclMidImgUrl : res.data.data.dlgcLjclMidImgUrl.split(","),

              dlgcLjgcAfterImgUrl : res.data.data.dlgcLjgcAfterImgUrl.split(","),
              dlgcLjgcBeforeImgUrl :  res.data.data.dlgcLjgcBeforeImgUrl.split(","),
              dlgcLjgcMidImgUrl : res.data.data.dlgcLjgcMidImgUrl.split(","),

              dlgcJcjazAfterImgUrl : res.data.data.dlgcJcjazAfterImgUrl.split(","),
              dlgcJcjazMidImgUrl : res.data.data.dlgcJcjazMidImgUrl.split(","),
              dlgcJcjazBeforeImgUrl : res.data.data.dlgcJcjazBeforeImgUrl.split(","),

              dlgcYwsgAfterImgUrl : res.data.data.dlgcYwsgAfterImgUrl.split(","),
              dlgcYwsgBeforeImgUrl : res.data.data.dlgcYwsgBeforeImgUrl.split(","),
              dlgcYwsgMidImgUrl : res.data.data.dlgcYwsgMidImgUrl.split(","),

              dlgcJgjcAfterImgUrl : res.data.data.dlgcJgjcAfterImgUrl.split(","),
              dlgcJgjcBeforeImgUrl : res.data.data.dlgcJgjcBeforeImgUrl.split(","),
              dlgcJgjcMidImgUrl : res.data.data.dlgcJgjcMidImgUrl.split(","),

              dlgcJgmcAfterImgUrl : res.data.data.dlgcJgmcAfterImgUrl.split(","),
              dlgcJgmcBeforeImgUrl : res.data.data.dlgcJgmcBeforeImgUrl.split(","),
              dlgcJgmcMidImgUrl : res.data.data.dlgcJgmcMidImgUrl.split(","),
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