var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  
  data: {
    projectId: '',//项目id
    categoryType: '',//项目类别
  },


  onLoad: function (e) {
    var that = this;
    that.setData({
      projectId: e.projectId,
      categoryType: e.categoryType
    })
  },

  
})