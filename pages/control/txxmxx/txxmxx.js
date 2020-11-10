var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectNameListByCategory: [],
    active: 0,//tabbar索引
    showPlanSchedule: true,//展示进度计划
    showProjectInfo: false,//展示项目信息
  },
  // 跳转到填写计划
  totxPlan: function(e){
   var tag = e.currentTarget.dataset.tag
    wx.navigateTo({
      url: '/pages/control/txxmxx/txPlan/txPlan?tag='+tag,
    })
  },

<<<<<<< HEAD
  onLoad: function(e){
    var that = this;
    that.setData({
      projectNameListByCategory: app.globalData.projectNameListByCategory,
      showLoading: false
    });
  },

=======
>>>>>>> 280516c77ae1670597a710933bd71a0f660d2c98

  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail
    })
    switch(e.detail){
      case 0:
        that.setData({
          showPlanSchedule: true,
          showProjectInfo: false
        });
        break;
      case 1:
        that.setData({
          showProjectInfo: true,
          showPlanSchedule: false
        });
        break;
      case 2:
        that.setData({
          showProjectInfo: false,
          showPlanSchedule: false
        });
        break;
      case 3:
        that.setData({
          showProjectInfo: false,
          showPlanSchedule: false
        });
        break;
    }
    
  },

  
})