const app = getApp();
// const RootPath = "http://localhost:16000";
const RootPath = "https://telecom1.xizinet.com:4433";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmSzqll:{},
    ptgcRxdgcAfterImgUrl: [], 
    ptgcRxdgcBeforeImgUrl: [], 
    ptgcRxdgcMidImgUrl: [], 

    ptgcLhgcAfterImgUrl: [], 
    ptgcLhgcBeforeImgUrl: [], 
    ptgcLhgcMidImgUrl: [],

    ptgcLvhgcAfterImgUrl: [], 
    ptgcLvhgcBeforeImgUrl: [], 
    ptgcLvhgcMidImgUrl: [], 

    ptgcBsbpAfterImgUrl: [], 
    ptgcBsbpMidImgUrl: [], 
    ptgcBsbpBeforeImgUrl: [], 

    ptgcJtxhdAfterImgUrl: [], 
    ptgcJtxhdBeforeImgUrl: [], 
    ptgcJtxhdMidImgUrl: [], 

    ptgcBpclAfterImgUrl: [], 
    ptgcBpclBeforeImgUrl: [], 
    ptgcBpclMidImgUrl: [], 

    ptgcLxgcAfterImgUrl: [], 
    ptgcLxgcBeforeImgUrl: [], 
    ptgcLxgcMidImgUrl: [], 
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
              ptgcRxdgcAfterImgUrl : res.data.data.ptgcRxdgcAfterImgUrl.split(","),
              ptgcRxdgcBeforeImgUrl : res.data.data.ptgcRxdgcBeforeImgUrl.split(","),
              ptgcRxdgcMidImgUrl : res.data.data.ptgcRxdgcMidImgUrl.split(","),

              ptgcLhgcAfterImgUrl : res.data.data.ptgcLhgcAfterImgUrl.split(","),
              ptgcLhgcBeforeImgUrl : res.data.data.ptgcLhgcBeforeImgUrl.split(","),
              ptgcLhgcMidImgUrl : res.data.data.ptgcLhgcMidImgUrl.split(","),

              ptgcLvhgcAfterImgUrl : res.data.data.ptgcLvhgcAfterImgUrl.split(","),
              ptgcLvhgcBeforeImgUrl :  res.data.data.ptgcLvhgcBeforeImgUrl.split(","),
              ptgcLvhgcMidImgUrl : res.data.data.ptgcLvhgcMidImgUrl.split(","),

              ptgcBsbpAfterImgUrl : res.data.data.ptgcBsbpAfterImgUrl.split(","),
              ptgcBsbpMidImgUrl : res.data.data.ptgcBsbpMidImgUrl.split(","),
              ptgcBsbpBeforeImgUrl : res.data.data.ptgcBsbpBeforeImgUrl.split(","),

              ptgcJtxhdAfterImgUrl : res.data.data.ptgcJtxhdAfterImgUrl.split(","),
              ptgcJtxhdBeforeImgUrl : res.data.data.ptgcJtxhdBeforeImgUrl.split(","),
              ptgcJtxhdMidImgUrl : res.data.data.ptgcJtxhdMidImgUrl.split(","),

              ptgcBpclAfterImgUrl : res.data.data.ptgcBpclAfterImgUrl.split(","),
              ptgcBpclBeforeImgUrl : res.data.data.ptgcBpclBeforeImgUrl.split(","),
              ptgcBpclMidImgUrl : res.data.data.ptgcBpclMidImgUrl.split(","),

              ptgcLxgcAfterImgUrl : res.data.data.ptgcLxgcAfterImgUrl.split(","),
              ptgcLxgcBeforeImgUrl : res.data.data.ptgcLxgcBeforeImgUrl.split(","),
              ptgcLxgcMidImgUrl : res.data.data.ptgcLxgcMidImgUrl.split(","),
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