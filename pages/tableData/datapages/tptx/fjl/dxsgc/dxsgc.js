const app = getApp();
//  const RootPath = "http://localhost:16000";
const RootPath = app.globalData.imageRootPath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmFjl:{},
	dxsgcTfgcAfterUrl: [], 
    dxsgcTfgcBeforeUrl: [], 
    dxsgcTfgcMidUrl: [], 

    dxsgcZhgcAfterUrl: [], 
    dxsgcZhgcBeforeUrl: [], 
    dxsgcZhgcMidUrl: [],

    dxsgcJcgcAfterUrl: [], 
    dxsgcJcgcBeforeUrl: [], 
    dxsgcJcgcMidUrl: [], 

    dxsgcDcgcAfterUrl: [], 
    dxsgcDcgcMidUrl: [], 
    dxsgcDcgcBeforeUrl: [], 

    dxsgcDbgcAfterUrl: [], 
    dxsgcDbgcBeforeUrl: [], 
    dxsgcDbgcMidUrl: [], 

    dxsgcQzgcAfterUrl: [], 
    dxsgcQzgcBeforeUrl: [], 
    dxsgcQzgcMidUrl: [], 

    dxsgcDingbgcAfterUrl: [], 
    dxsgcDingbgcBeforeUrl: [], 
    dxsgcDingbgcMidUrl: [], 
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
      url: RootPath + "/jk-gcgl/api/fjl/pmTptx/dxsgc?pId="+app.globalData.projectId, //请求路径
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
              pmFjl: res.data.data,
              dxsgcTfgcAfterUrl : res.data.data.dxsgcTfgcAfterUrl.split(","),
              dxsgcTfgcBeforeUrl : res.data.data.dxsgcTfgcBeforeUrl.split(","),
              dxsgcTfgcMidUrl : res.data.data.dxsgcTfgcMidUrl.split(","),

              dxsgcZhgcAfterUrl : res.data.data.dxsgcZhgcAfterUrl.split(","),
              dxsgcZhgcBeforeUrl : res.data.data.dxsgcZhgcBeforeUrl.split(","),
              dxsgcZhgcMidUrl : res.data.data.dxsgcZhgcMidUrl.split(","),

              dxsgcJcgcAfterUrl : res.data.data.dxsgcJcgcAfterUrl.split(","),
              dxsgcJcgcBeforeUrl :  res.data.data.dxsgcJcgcBeforeUrl.split(","),
              dxsgcJcgcMidUrl : res.data.data.dxsgcJcgcMidUrl.split(","),

              dxsgcDcgcAfterUrl : res.data.data.dxsgcDcgcAfterUrl.split(","),
              dxsgcDcgcMidUrl : res.data.data.dxsgcDcgcMidUrl.split(","),
              dxsgcDcgcBeforeUrl : res.data.data.dxsgcDcgcBeforeUrl.split(","),

              dxsgcDbgcAfterUrl : res.data.data.dxsgcDbgcAfterUrl.split(","),
              dxsgcDbgcBeforeUrl : res.data.data.dxsgcDbgcBeforeUrl.split(","),
              dxsgcDbgcMidUrl : res.data.data.dxsgcDbgcMidUrl.split(","),

              dxsgcQzgcAfterUrl : res.data.data.dxsgcQzgcAfterUrl.split(","),
              dxsgcQzgcBeforeUrl : res.data.data.dxsgcQzgcBeforeUrl.split(","),
              dxsgcQzgcMidUrl : res.data.data.dxsgcQzgcMidUrl.split(","),

              dxsgcDingbgcAfterUrl : res.data.data.dxsgcDingbgcAfterUrl.split(","),
              dxsgcDingbgcBeforeUrl : res.data.data.dxsgcDingbgcBeforeUrl.split(","),
              dxsgcDingbgcMidUrl : res.data.data.dxsgcDingbgcMidUrl.split(","),
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