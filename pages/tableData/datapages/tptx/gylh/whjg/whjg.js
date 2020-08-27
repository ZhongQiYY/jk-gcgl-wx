const app = getApp();
const RootPath = "http://localhost:16000";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmGylhl:{},
    whjgSxzlAfterImgUrl: [], 
    whjgSxzlBeforeImgUrl: [], 
    whjgSxzlMidImgUrl: [], 

    whjgMzdAfterImgUrl: [], 
    whjgMzdBeforeImgUrl: [], 
    whjgMzdMidImgUrl: [],

    whjgJgqAfterImgUrl: [], 
    whjgJgqBeforeImgUrl: [], 
    whjgJgqMidImgUrl: [], 

    whjgYsxpAfterImgUrl: [], 
    whjgYsxpMidImgUrl: [], 
    whjgYsxpBeforeImgUrl: [], 

    whjgWhdsAfterImgUrl: [], 
    whjgWhdsBeforeImgUrl: [], 
    whjgWhdsMidImgUrl: [], 

    whjgMhkhAfterImgUrl: [], 
    whjgMhkhBeforeImgUrl: [], 
    whjgMhkhMidImgUrl: [], 

    whjgYtbzAfterImgUrl: [], 
    whjgYtbzBeforeImgUrl: [], 
    whjgYtbzMidImgUrl: [], 
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
              whjgSxzlAfterImgUrl : res.data.data.whjgSxzlAfterImgUrl.split(","),
              whjgSxzlBeforeImgUrl : res.data.data.whjgSxzlBeforeImgUrl.split(","),
              whjgSxzlMidImgUrl : res.data.data.whjgSxzlMidImgUrl.split(","),

              whjgMzdAfterImgUrl : res.data.data.whjgMzdAfterImgUrl.split(","),
              whjgMzdBeforeImgUrl : res.data.data.whjgMzdBeforeImgUrl.split(","),
              whjgMzdMidImgUrl : res.data.data.whjgMzdMidImgUrl.split(","),

              whjgJgqAfterImgUrl : res.data.data.whjgJgqAfterImgUrl.split(","),
              whjgJgqBeforeImgUrl :  res.data.data.whjgJgqBeforeImgUrl.split(","),
              whjgJgqMidImgUrl : res.data.data.whjgJgqMidImgUrl.split(","),

              whjgYsxpAfterImgUrl : res.data.data.whjgYsxpAfterImgUrl.split(","),
              whjgYsxpMidImgUrl : res.data.data.whjgYsxpMidImgUrl.split(","),
              whjgYsxpBeforeImgUrl : res.data.data.whjgYsxpBeforeImgUrl.split(","),

              whjgWhdsAfterImgUrl : res.data.data.whjgWhdsAfterImgUrl.split(","),
              whjgWhdsBeforeImgUrl : res.data.data.whjgWhdsBeforeImgUrl.split(","),
              whjgWhdsMidImgUrl : res.data.data.whjgWhdsMidImgUrl.split(","),

              whjgMhkhAfterImgUrl : res.data.data.whjgMhkhAfterImgUrl.split(","),
              whjgMhkhBeforeImgUrl : res.data.data.whjgMhkhBeforeImgUrl.split(","),
              whjgMhkhMidImgUrl : res.data.data.whjgMhkhMidImgUrl.split(","),

              whjgYtbzAfterImgUrl : res.data.data.whjgYtbzAfterImgUrl.split(","),
              whjgYtbzBeforeImgUrl : res.data.data.whjgYtbzBeforeImgUrl.split(","),
              whjgYtbzMidImgUrl : res.data.data.whjgYtbzMidImgUrl.split(","),
		
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