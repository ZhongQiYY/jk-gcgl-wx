const app = getApp();
// const RootPath = "http://localhost:16000";
const RootPath = app.globalData.imageRootPath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmGylhl:{},
    ptyfTfgcAfterImgUrl: [], 
    ptyfTfgcBeforeImgUrl: [], 
    ptyfTfgcMidImgUrl: [], 

    ptyfJcgcAfterImgUrl: [], 
    ptyfJcgcBeforeImgUrl: [], 
    ptyfJcgcMidImgUrl: [],

    ptyfZtgcAfterImgUrl: [], 
    ptyfZtgcBeforeImgUrl: [], 
    ptyfZtgcMidImgUrl: [], 

    ptyfZszxAfterImgUrl: [], 
    ptyfZszxMidImgUrl: [], 
    ptyfZszxBeforeImgUrl: [], 

    ptyfGsgdAfterImgUrl: [], 
    ptyfGsgdBeforeImgUrl: [], 
    ptyfGsgdMidImgUrl: [], 

    ptyfPspwAfterImgUrl: [], 
    ptyfPspwBeforeImgUrl: [], 
    ptyfPspwMidImgUrl: [], 

    ptyfLxgcAfterImgUrl: [], 
    ptyfLxgcBeforeImgUrl: [], 
    ptyfLxgcMidImgUrl: [], 
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
      url: RootPath + "/jk-gcgl/api/tptx/pmTptx/gylhl?pId="+app.globalData.projectId, //请求路径
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
              ptyfTfgcAfterImgUrl : res.data.data.ptyfTfgcAfterImgUrl.split(","),
              ptyfTfgcBeforeImgUrl : res.data.data.ptyfTfgcBeforeImgUrl.split(","),
              ptyfTfgcMidImgUrl : res.data.data.ptyfTfgcMidImgUrl.split(","),

              ptyfJcgcAfterImgUrl : res.data.data.ptyfJcgcAfterImgUrl.split(","),
              ptyfJcgcBeforeImgUrl : res.data.data.ptyfJcgcBeforeImgUrl.split(","),
              ptyfJcgcMidImgUrl : res.data.data.ptyfJcgcMidImgUrl.split(","),

              ptyfZtgcAfterImgUrl : res.data.data.ptyfZtgcAfterImgUrl.split(","),
              ptyfZtgcBeforeImgUrl :  res.data.data.ptyfZtgcBeforeImgUrl.split(","),
              ptyfZtgcMidImgUrl : res.data.data.ptyfZtgcMidImgUrl.split(","),

              ptyfZszxAfterImgUrl : res.data.data.ptyfZszxAfterImgUrl.split(","),
              ptyfZszxMidImgUrl : res.data.data.ptyfZszxMidImgUrl.split(","),
              ptyfZszxBeforeImgUrl : res.data.data.ptyfZszxBeforeImgUrl.split(","),

              ptyfGsgdAfterImgUrl : res.data.data.ptyfGsgdAfterImgUrl.split(","),
              ptyfGsgdBeforeImgUrl : res.data.data.ptyfGsgdBeforeImgUrl.split(","),
              ptyfGsgdMidImgUrl : res.data.data.ptyfGsgdMidImgUrl.split(","),

              ptyfPspwAfterImgUrl : res.data.data.ptyfPspwAfterImgUrl.split(","),
              ptyfPspwBeforeImgUrl : res.data.data.ptyfPspwBeforeImgUrl.split(","),
              ptyfPspwMidImgUrl : res.data.data.ptyfPspwMidImgUrl.split(","),

              ptyfLxgcAfterImgUrl : res.data.data.ptyfLxgcAfterImgUrl.split(","),
              ptyfLxgcBeforeImgUrl : res.data.data.ptyfLxgcBeforeImgUrl.split(","),
              ptyfLxgcMidImgUrl : res.data.data.ptyfLxgcMidImgUrl.split(","),
			  
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