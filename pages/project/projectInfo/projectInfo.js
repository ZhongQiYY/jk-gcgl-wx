// pages/project/projectInfo/projectInfo.js
var app = getApp();
var basePath = app.globalData.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: "",
    projectInfo: {},
    isJbxxShow: false,
    isWfxxShow: false,
    isZjqkShow: false,
    isDtqkShow: false,
    moneyUnit: "万元",
    buildArea: "万平米",
    coverArea: "亩",
    projectName: "",
    rootPath: "https://test.xizinet.com",
    categoryType: 0,
    loadingHidden: false,
  },

  //跳转到数据表界面
  toTableData: function () {
    app.globalData.pName = this.data.projectName;
    wx.switchTab({
      url: '/pages/tableData/tableData'
    });
  },

  //点击五方信息触发
  towfxx: function (e) {
    setTimeout(function () {
      wx.pageScrollTo({
        duration: 300,
        selector: '#wfxx'
        // scrollTop: 0
      });
    }, 600);
    this.setData({
      isWfxxShow: !this.data.isWfxxShow,
      isJbxxShow: false,
      isZjqkShow: false,
      isDtqkShow: false
    })

  },
  //点击基本信息触发
  toJbxx: function (e) {
    setTimeout(function () {
      wx.pageScrollTo({
        duration: 300,
        selector: '.jbxx'
        // scrollTop: 0
      });
    }, 600);
    this.setData({
      isJbxxShow: !this.data.isJbxxShow,
      isWfxxShow: false,
      isZjqkShow: false,
      isDtqkShow: false
    })
  },
  //点击资金信息触发
  toZjqk: function (e) {
    setTimeout(function () {
      wx.pageScrollTo({
        duration: 300,
        selector: '.zjqk'
        // scrollTop: 0
      });
    }, 600);

    this.setData({
      isZjqkShow: !this.data.isZjqkShow,
      isWfxxShow: false,
      isJbxxShow: false,
      isDtqkShow: false
    })
  },
  //点击单体情况触发
  toDtqk: function (e) {
    setTimeout(function () {
      wx.pageScrollTo({
        duration: 300,
        selector: '.dtqk'
        // scrollTop: 0
      });
    }, 600);

    this.setData({
      isDtqkShow: !this.data.isDtqkShow,
      isWfxxShow: false,
      isJbxxShow: false,
      isZjqkShow: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.stopPullDownRefresh();
    that.setData({
      projectName: app.globalData.pName,
      categoryType: app.globalData.categoryType,
    })
    wx.request({
      url: basePath + "/api/project/projectBaseInfo", //请求路径
      method: 'post',
      data: {
        projectId: app.globalData.projectId,
        categoryType: app.globalData.categoryType
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        that.setData({ 
          projectInfo: res.data,  
          loadingHidden: true,
          imagePath: that.data.rootPath + res.data.effectPicture   
        });
      }
    });
  },

  //下拉触发
  onPullDownRefresh: function() {
    var that = this;
    that.onLoad();
  },






  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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