// pages/tableData/tableData.js
var app = getApp();
var basePath = app.globalData.basePath;
Page({

  mixins: [require('../../dist/mixin/themeChanged')],

  /**
   * 页面的初始数据
   */
  data: {
    projectNames: [], //@@
    projectName: ""
  },

  toPlan: function() {
    if(app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/annualplan/annualplan',
      })
    }   
  },

  toDb: function() {
    if(app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/control/dcdb/dcdb',
      })
    } 
  },

  toSwInstruction: function () {
    if(app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/tzwj/tzwj',
      })
    }   
  },

  toHtgl: function () {
    if(app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/htgl/htgl',
      })
    } 
  },

  toTptx: function () {
    if(app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/tptx/tptx',
      })
    }
  },

  toZjjk: function() {
    if(app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/zjjk/zjjk',
      })
    }
  },
 
  toSjtj: function() {
    if(app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/sjtj/sjtj',
      })
    }
  },

  toYdxx: function() {
    if(app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/ydxx/ydxx',
      })
    }
  },

  toTxsx: function(){
    if(app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/txsx/txsx',
      })
    }
  },


//搜索框组件返回的方法 @@
inputTyping: function (e) {
  var inputVal = e.detail.inputVal;
  var projectNames1 = [];
  if (inputVal.length > 0) {
    for (const nl of app.globalData.projectNameList) {
      var projectName = nl.projectName;
      if (projectName.indexOf(inputVal) != -1) {
        projectNames1.push(nl);
      }
    }
  }
  this.setData({
    projectNames: projectNames1
  })
},
//搜索框组件返回的方法 
selectProject: function (e) {
  app.globalData.pName = e.detail.projectName;
  app.globalData.projectId = e.detail.projectId;
  app.globalData.categoryType = e.detail.categoryType;
  this.setData({
    projectName: e.detail.projectName
  });
},










  // -------生命周期函数---------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = app.globalData.projectNameList;
    if(list.length <= 0){
      console.log("zhongqi")
      wx.request({
        url: basePath+"/api/project/nameList", //请求路径
        method: 'post',
        data: {
          
        },
        header: {
          'content-type': 'application/json', // 默认值
          'thirdSession': app.globalData.thirdSession
        },
        success (res) {
          app.globalData.projectNameList = res.data  
        }
      });
    }
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
    this.setData({
      projectName: app.globalData.pName
    })
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