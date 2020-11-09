var app = getApp();
var request = app.globalData.request;
var requestValue = app.globalData.requestValue;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectNameListByCategory: [],
    showLoading: true,
    projectId: 0,
    categoryType: 0,
  },

  onLoad: function(e){
    var that = this;

    that.setData({
      projectNameListByCategory: app.globalData.projectNameListByCategory,
      showLoading: false
    });
  },

  
  
})