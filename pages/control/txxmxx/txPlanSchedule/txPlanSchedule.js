var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: '',
    projectNameListByCategory: [],
    showLoading: true,
    projectId: 0,
    categoryType: 0,
  },

  onLoad: function(e){
    console.log(e);
    var that = this;
    that.setData({
      projectNameListByCategory: app.globalData.projectNameListByCategory,
      showLoading: false,
      tag: e.tag
    });
  },

  
  
})