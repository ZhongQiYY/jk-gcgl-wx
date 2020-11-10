var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  data: {
    projectNameListByCategory: [],
    active: 0,//tabbar索引
    showPlanSchedule: 0,//展示进度计划
    showProjectInfo: 1,//展示项目信息
  },

  onLoad: function(e){
    var that = this;
    that.setData({
      projectNameListByCategory: app.globalData.projectNameListByCategory,
    });
  },

  
  // 跳转到填写计划
  totxPlan: function(e){
   var tag = e.currentTarget.dataset.tag
    wx.navigateTo({
      url: '/pages/control/txxmxx/txPlan/txPlan?tag='+tag,
    })
  },


  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail
    })
  },

  
})