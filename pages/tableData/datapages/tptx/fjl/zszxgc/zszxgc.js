const app = getApp();
//  const RootPath = "http://localhost:16000";
const RootPath = app.globalData.imageRootPath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmFjl:{},
	  zszxgcQqmhAfterUrl: [], 
    zszxgcQqmhBeforeUrl: [], 
    zszxgcQqmhMidUrl: [], 

    zszxgcMcazAfterUrl: [], 
    zszxgcMcazBeforeUrl: [], 
    zszxgcMcazMidUrl: [],

    zszxgcFslgAfterUrl: [], 
    zszxgcFslgBeforeUrl: [], 
    zszxgcFslgMidUrl: [], 

    zszxgcWqmcAfterUrl: [], 
    zszxgcWqmcMidUrl: [], 
    zszxgcWqmcBeforeUrl: [], 

    zszxgcDtazAfterUrl: [], 
    zszxgcDtazBeforeUrl: [], 
    zszxgcDtazMidUrl: [], 

    zszxgcXfazAfterUrl: [], 
    zszxgcXfazBeforeUrl: [], 
    zszxgcXfazMidUrl: [], 

    zszxgcLdmsAfterUrl: [], 
    zszxgcLdmsBeforeUrl: [], 
    zszxgcLdmsMidUrl: [], 
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
      url: RootPath + "/jk-gcgl/api/fjl/pmTptx/zszxgc?pId="+app.globalData.projectId, //请求路径
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
              zszxgcQqmhAfterUrl : res.data.data.zszxgcQqmhAfterUrl.split(","),
              zszxgcQqmhBeforeUrl : res.data.data.zszxgcQqmhBeforeUrl.split(","),
              zszxgcQqmhMidUrl : res.data.data.zszxgcQqmhMidUrl.split(","),

              zszxgcMcazAfterUrl : res.data.data.zszxgcMcazAfterUrl.split(","),
              zszxgcMcazBeforeUrl : res.data.data.zszxgcMcazBeforeUrl.split(","),
              zszxgcMcazMidUrl : res.data.data.zszxgcMcazMidUrl.split(","),

              zszxgcFslgAfterUrl : res.data.data.zszxgcFslgAfterUrl.split(","),
              zszxgcFslgBeforeUrl :  res.data.data.zszxgcFslgBeforeUrl.split(","),
              zszxgcFslgMidUrl : res.data.data.zszxgcFslgMidUrl.split(","),

              zszxgcWqmcAfterUrl : res.data.data.zszxgcWqmcAfterUrl.split(","),
              zszxgcWqmcMidUrl : res.data.data.zszxgcWqmcMidUrl.split(","),
              zszxgcWqmcBeforeUrl : res.data.data.zszxgcWqmcBeforeUrl.split(","),

              zszxgcDtazAfterUrl : res.data.data.zszxgcDtazAfterUrl.split(","),
              zszxgcDtazBeforeUrl : res.data.data.zszxgcDtazBeforeUrl.split(","),
              zszxgcDtazMidUrl : res.data.data.zszxgcDtazMidUrl.split(","),

              zszxgcXfazAfterUrl : res.data.data.zszxgcXfazAfterUrl.split(","),
              zszxgcXfazBeforeUrl : res.data.data.zszxgcXfazBeforeUrl.split(","),
              zszxgcXfazMidUrl : res.data.data.zszxgcXfazMidUrl.split(","),

              zszxgcLdmsAfterUrl : res.data.data.zszxgcLdmsAfterUrl.split(","),
              zszxgcLdmsBeforeUrl : res.data.data.zszxgcLdmsBeforeUrl.split(","),
              zszxgcLdmsMidUrl : res.data.data.zszxgcLdmsMidUrl.split(","),
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