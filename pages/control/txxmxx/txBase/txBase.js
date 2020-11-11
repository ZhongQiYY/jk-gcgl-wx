const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
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
    console.log(e)
    that.setData({
      projectId: e.projectId,
      categoryType: e.categoryType
    });
    request.post(requestUrl.projectInformation, {projectId:that.data.projectId,categoryType:that.data.categoryType}).then(res => {
      console.log(res)
      that.setData({
        projectInfo: res.data,
        showLoadLoading: false
      });
    }).catch(err => {
      that.setData({
        showLoadLoading: false
      })
    })
  },

  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail
    })
  }
})