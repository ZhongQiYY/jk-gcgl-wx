const app = getApp();
//  const RootPath = "http://localhost:16000";
const RootPath = app.globalData.imageRootPath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmFjl:{},
      ptgcGsgcAfterUrl: [], 
      ptgcGsgcBeforeUrl: [], 
      ptgcGsgcMidUrl: [], 
  
      ptgcGdgcAfterUrl: [], 
      ptgcGdgcBeforeUrl: [], 
      ptgcGdgcMidUrl: [],
  
      ptgcGqgcAfterUrl: [], 
      ptgcGqgcBeforeUrl: [], 
      ptgcGqgcMidUrl: [], 
  
      ptgcPspwAfterUrl: [], 
      ptgcPspwMidUrl: [], 
      ptgcPspwBeforeUrl: [], 
  
      ptgcDlpzAfterUrl: [], 
      ptgcDlpzBeforeUrl: [], 
      ptgcDlpzMidUrl: [], 
  
      ptgcLhgcAfterUrl: [], 
      ptgcLhgcBeforeUrl: [], 
      ptgcLhgcMidUrl: [], 
  
      ptgcLvhgcAfterUrl: [], 
      ptgcLvhgcBeforeUrl: [], 
      ptgcLvhgcMidUrl: [], 
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
      url: RootPath + "/jk-gcgl/api/fjl/pmTptx/ptgc?pId="+app.globalData.projectId, //请求路径
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
              ptgcGsgcAfterUrl : res.data.data.ptgcGsgcAfterUrl.split(","),
              ptgcGsgcBeforeUrl : res.data.data.ptgcGsgcBeforeUrl.split(","),
              ptgcGsgcMidUrl : res.data.data.ptgcGsgcMidUrl.split(","),

              ptgcGdgcAfterUrl : res.data.data.ptgcGdgcAfterUrl.split(","),
              ptgcGdgcBeforeUrl : res.data.data.ptgcGdgcBeforeUrl.split(","),
              ptgcGdgcMidUrl : res.data.data.ptgcGdgcMidUrl.split(","),

              ptgcGqgcAfterUrl : res.data.data.ptgcGqgcAfterUrl.split(","),
              ptgcGqgcBeforeUrl :  res.data.data.ptgcGqgcBeforeUrl.split(","),
              ptgcGqgcMidUrl : res.data.data.ptgcGqgcMidUrl.split(","),

              ptgcPspwAfterUrl : res.data.data.ptgcPspwAfterUrl.split(","),
              ptgcPspwMidUrl : res.data.data.ptgcPspwMidUrl.split(","),
              ptgcPspwBeforeUrl : res.data.data.ptgcPspwBeforeUrl.split(","),

              ptgcDlpzAfterUrl : res.data.data.ptgcDlpzAfterUrl.split(","),
              ptgcDlpzBeforeUrl : res.data.data.ptgcDlpzBeforeUrl.split(","),
              ptgcDlpzMidUrl : res.data.data.ptgcDlpzMidUrl.split(","),

              ptgcLhgcAfterUrl : res.data.data.ptgcLhgcAfterUrl.split(","),
              ptgcLhgcBeforeUrl : res.data.data.ptgcLhgcBeforeUrl.split(","),
              ptgcLhgcMidUrl : res.data.data.ptgcLhgcMidUrl.split(","),

              ptgcLvhgcAfterUrl : res.data.data.ptgcLvhgcAfterUrl.split(","),
              ptgcLvhgcBeforeUrl : res.data.data.ptgcLvhgcBeforeUrl.split(","),
              ptgcLvhgcMidUrl : res.data.data.ptgcLvhgcMidUrl.split(","),
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