var base64 = require("../../dist/example/images/base64");
var app = getApp();
Page({
  mixins: [require('../../dist/mixin/themeChanged')],

  data: {
    buildArray: ['--请选择--','科技城', '满园', '西城', '综保区', '中恒工业', '中恒商业', '磊昇', '工建'],
    categoryArray: ['--请选择--','返迁棚改', '工业厂房', '商业地产', '文教体卫', '公园绿化', '市政桥梁'],
    buildIndex: 0,
    categoryIndex: 0,

    projectList: [
      {id: "1", projectName: "华昌新材料产业园（能之光代建）标准厂房", explain: "新建项目"},
      {id: "2", projectName: "华昌科技园标准厂房", explain: "新建项目"},
      {id: "3", projectName: "秋山科技园标准厂房", explain: "新建项目"},
      {id: "4", projectName: "江奥科技园标准厂房", explain: "新建项目"},
      {id: "5", projectName: "涌泉科技园标准厂房", explain: "续建项目"},
      {id: "6", projectName: "横江产业园标准厂房", explain: "续建项目"},
      {id: "7", projectName: "金凤智谷一期项目", explain: "续建项目"},
      {id: "8", projectName: "秋月科技园标准厂房", explain: "新建项目"},
      {id: "9", projectName: "春花科技园", explain: "续建项目"},
      {id: "10", projectName: "横江产业园标准厂房", explain: "新建项目"},
    ],

    projectListShow: true,
    projectInfoShow: false,
    projectName: ""
  },

  // 选择建设单位
  bindBuildChange: function(e) {  
    this.setData({
      buildIndex: e.detail.value
    })
  },
  // 选择项目类别
  bindCategoryChange: function(e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },

  //显示项目详情
  showProjectInfo: function(e) {
    this.setData({
      projectListShow: false,
      projectInfoShow: true,
      projectName: e.currentTarget.dataset.text
    })
  },

  //跳转到数据表界面
  toTableData: function() {
    app.globalData.pName = this.data.projectName;
    wx.switchTab({
      url: '/pages/tableData/tableData'
    });
  },

  //显示项目列表
  showProjectList: function(e) {
    this.setData({
      projectListShow: true,
      projectInfoShow: false
    })
  },

//--------------------------生命周期函数------------------------------


  onLoad: function(options){
      this.setData({
          icon: base64.icon20
      });
      app.userLogin(function(){
        page.setData({
          hasUserInfo: app.globalData.hasUserInfo
        });
      });

  }
})