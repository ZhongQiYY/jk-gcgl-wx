const app = getApp();
const RootPath = "http://localhost:16000";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pmSzqll:{},
    jpsgcTfgcAfterImgUrl: [], 
    jpsgcTfgcBeforeImgUrl: [], 
    jpsgcTfgcMidImgUrl: [], 

    jpsgcGckwAfterImgUrl: [], 
    jpsgcGckwBeforeImgUrl: [], 
    jpsgcGckwMidImgUrl: [],

    jpsgcJcdcAfterImgUrl: [], 
    jpsgcJcdcBeforeImgUrl: [], 
    jpsgcJcdcMidImgUrl: [], 

    jpsgcGdazAfterImgUrl: [], 
    jpsgcGdazMidImgUrl: [], 
    jpsgcGdazBeforeImgUrl: [], 

    jpsgcGdbfAfterImgUrl: [], 
    jpsgcGdbfBeforeImgUrl: [], 
    jpsgcGdbfMidImgUrl: [], 

    jpsgcGdtsAfterImgUrl: [], 
    jpsgcGdtsBeforeImgUrl: [], 
    jpsgcGdtsMidImgUrl: [], 

    jpsgcGdttAfterImgUrl: [], 
    jpsgcGdttBeforeImgUrl: [], 
    jpsgcGdttMidImgUrl: [], 
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
              jpsgcTfgcAfterImgUrl : res.data.data.jpsgcTfgcAfterImgUrl.split(","),
              jpsgcTfgcBeforeImgUrl : res.data.data.jpsgcTfgcBeforeImgUrl.split(","),
              jpsgcTfgcMidImgUrl : res.data.data.jpsgcTfgcMidImgUrl.split(","),

              jpsgcGckwAfterImgUrl : res.data.data.jpsgcGckwAfterImgUrl.split(","),
              jpsgcGckwBeforeImgUrl : res.data.data.jpsgcGckwBeforeImgUrl.split(","),
              jpsgcGckwMidImgUrl : res.data.data.jpsgcGckwMidImgUrl.split(","),

              jpsgcJcdcAfterImgUrl : res.data.data.jpsgcJcdcAfterImgUrl.split(","),
              jpsgcJcdcBeforeImgUrl :  res.data.data.jpsgcJcdcBeforeImgUrl.split(","),
              jpsgcJcdcMidImgUrl : res.data.data.jpsgcJcdcMidImgUrl.split(","),

              jpsgcGdazAfterImgUrl : res.data.data.jpsgcGdazAfterImgUrl.split(","),
              jpsgcGdazMidImgUrl : res.data.data.jpsgcGdazMidImgUrl.split(","),
              jpsgcGdazBeforeImgUrl : res.data.data.jpsgcGdazBeforeImgUrl.split(","),

              jpsgcGdbfAfterImgUrl : res.data.data.jpsgcGdbfAfterImgUrl.split(","),
              jpsgcGdbfBeforeImgUrl : res.data.data.jpsgcGdbfBeforeImgUrl.split(","),
              jpsgcGdbfMidImgUrl : res.data.data.jpsgcGdbfMidImgUrl.split(","),

              jpsgcGdtsAfterImgUrl : res.data.data.jpsgcGdtsAfterImgUrl.split(","),
              jpsgcGdtsBeforeImgUrl : res.data.data.jpsgcGdtsBeforeImgUrl.split(","),
              jpsgcGdtsMidImgUrl : res.data.data.jpsgcGdtsMidImgUrl.split(","),

              jpsgcGdttAfterImgUrl : res.data.data.jpsgcGdttAfterImgUrl.split(","),
              jpsgcGdttBeforeImgUrl : res.data.data.jpsgcGdttBeforeImgUrl.split(","),
              jpsgcGdttMidImgUrl : res.data.data.jpsgcGdttMidImgUrl.split(","),

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