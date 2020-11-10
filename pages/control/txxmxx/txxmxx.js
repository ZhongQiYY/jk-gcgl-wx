Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,//tabbar索引
    showPlanSchedule: true,//展示进度计划

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
    switch(e.detail){
      case 0:
        that.setData({
          showPlanSchedule: true
        });
        break;
      case 1:
        that.setData({
          showPlanSchedule: false
        });
        break;
      case 2:
        that.setData({
          showPlanSchedule: false
        });
        break;
      case 3:
        that.setData({
          showPlanSchedule: false
        });
        break;
    }
    
  },

  
})