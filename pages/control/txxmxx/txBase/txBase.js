const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  data: {
    showBaseButton: false,
    moneyUnit: "万元",
    buildArea: "万平米",
    coverArea: "亩",
    active: 0,//tabbar索引
    showLoadLoading: true,
    showUpLoadLoading: false,
    projectId:'',
    categoryType:'',
    showBasics: 0,
    showFive: 1,
    showMoney: 2,
    showPart: 3,
    projectInfo: {},//项目信息
  },

  //提交基本信息
  baseFormSubmit: function(e){
    request.post(requestUrl.updateBaseInfo, {}).then(res => {
      
    }).catch(err => {
      
    })
  },
  baseChange:function(e){
    this.setData({
      showBaseButton: true
    })
  },

  onLoad: function (e) {
    var that = this;
    that.setData({
      projectId: e.projectId,
      categoryType: e.categoryType
    });
    request.post(requestUrl.projectInformation, {projectId:that.data.projectId,categoryType:that.data.categoryType}).then(res => {
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
      active: e.detail,
      showBaseButton: false
    })
  }
})