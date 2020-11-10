const app = getApp();
Page({

  data: {
    active: 0,//tabbar索引
    projectId:'',
    categoryType:'',
    showBasics: 0,
    showFive: 1,
    showMoney: 2,
    showPart: 3,
    projectInfo: {},//项目信息
  },

  onLoad: function (e) {
    var that = this;
    that.setData({
      projectId: e.projectId,
      categoryType: e.categoryType
    });
  },

  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail
    })
  }
})