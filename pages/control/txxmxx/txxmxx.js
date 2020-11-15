var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  data: {
    projectNameListByCategory: [],
    active: 0,//tabbar索引
    showPlanSchedule: 0,//展示进度计划
    showTimeLimitInfo: 1,//工期信息
    showProjectInfo: 2,//展示项目信息
    roleRealId: '',
    jhNotShow: true
  },

  onLoad: function(e){
    var that = this;
    that.setData({
      roleRealId: app.globalData.userInfo.roleRealId,
      projectNameListByCategory: app.globalData.projectNameListByCategory,
    });
    if(that.data.roleRealId==8){
      that.setData({
        jhNotShow: false
      })
    }
  },

  
  // 跳转到填写
  totxPlan: function(e){
   var tag = e.currentTarget.dataset.tag
    wx.navigateTo({
      url: '/pages/control/txxmxx/txPlanSchedule/txPlanSchedule?tag='+tag,
    })
  },


  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail
    })
  },

  
})