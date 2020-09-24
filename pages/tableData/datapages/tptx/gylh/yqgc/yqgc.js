const app = getApp();
// const RootPath = "http://localhost:16000";
const RootPath = app.globalData.imageRootPath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmGylhl:{},
    yqgcDxzxAfterImgUrl :[],
    yqgcDxzxMidImgUrl :[],
    yqgcDxzxAfterImgUrl:[],
    
    yqgcJgxpAfterImgUrl :[],
    yqgcJgxpMidImgUrl :[],
    yqgcJgxpBeforeImgUrl:[],

    yqgcJkznAfterImgUrl :[],
    yqgcJkznBeforeImgUrl :[],
    yqgcJkznMidImgUrl:[],

    yqgcJpsgcAfterImgUrl :[],
    yqgcJpsgcBeforeImgUrl :[],
    yqgcJpsgcMidImgUrl:[],

    yqgcLdzmAfterImgUrl :[],
    yqgcLdzmBeforeImgUrl :[],
    yqgcLdzmMidImgUrl:[],

    yqgcLhzzAfterImgUrl :[],
    yqgcLhzzBeforeImgUrl :[],
    yqgcLhzzMidImgUrl:[],

    yqgcLxgcAfterImgUrl :[],
    yqgcLxgcBeforeImgUrl :[],
    yqgcLxgcMidImgUrl:[],
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
              yqgcDxzxAfterImgUrl : res.data.data.yqgcDxzxAfterImgUrl.split(","),
              yqgcDxzxBeforeImgUrl : res.data.data.yqgcDxzxBeforeImgUrl.split(","),
              yqgcDxzxMidImgUrl : res.data.data.yqgcDxzxMidImgUrl.split(","),

              yqgcJgxpAfterImgUrl : res.data.data.yqgcJgxpAfterImgUrl.split(","),
              yqgcJgxpBeforeImgUrl : res.data.data.yqgcJgxpBeforeImgUrl.split(","),
              yqgcJgxpMidImgUrl : res.data.data.yqgcJgxpMidImgUrl.split(","),

              yqgcJkznAfterImgUrl : res.data.data.yqgcJkznAfterImgUrl.split(","),
              yqgcJkznBeforeImgUrl :  res.data.data.yqgcJkznBeforeImgUrl.split(","),
              yqgcJkznMidImgUrl : res.data.data.yqgcJkznMidImgUrl.split(","),

              yqgcJpsgcAfterImgUrl : res.data.data.yqgcJpsgcAfterImgUrl.split(","),
              yqgcJpsgcMidImgUrl : res.data.data.yqgcJpsgcMidImgUrl.split(","),
              yqgcJpsgcBeforeImgUrl : res.data.data.yqgcJpsgcBeforeImgUrl.split(","),

              yqgcLdzmAfterImgUrl : res.data.data.yqgcLdzmAfterImgUrl.split(","),
              yqgcLdzmBeforeImgUrl : res.data.data.yqgcLdzmBeforeImgUrl.split(","),
              yqgcLdzmMidImgUrl : res.data.data.yqgcLdzmMidImgUrl.split(","),

              yqgcLhzzAfterImgUrl : res.data.data.yqgcLhzzAfterImgUrl.split(","),
              yqgcLhzzBeforeImgUrl : res.data.data.yqgcLhzzBeforeImgUrl.split(","),
              yqgcLhzzMidImgUrl : res.data.data.yqgcLhzzMidImgUrl.split(","),

              yqgcLxgcAfterImgUrl : res.data.data.yqgcLxgcAfterImgUrl.split(","),
              yqgcLxgcBeforeImgUrl : res.data.data.yqgcLxgcBeforeImgUrl.split(","),
              yqgcLxgcMidImgUrl : res.data.data.yqgcLxgcMidImgUrl.split(","),

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