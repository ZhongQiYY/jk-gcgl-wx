var base64 = require("../../dist/example/images/base64");
var app = getApp();
var basePath = app.globalData.basePath;
Page({
  mixins: [require('../../dist/mixin/themeChanged')],

  data: {
    buildArray: ['--请选择--','科技城', '满园', '西城', '综保区', '中恒工业', '中恒商业', '磊昇', '工建'],
    categoryArray: ['--请选择--','返迁棚改', '工业厂房', '商业地产', '文教体卫', '公园绿化', '市政桥梁'],
    buildIndex: 0,
    categoryIndex: 0,

    projectList: [
    
    ],

    projectListShow: true,
    projectInfoShow: false,
    projectName: ""
  },

  // 选择建设单位
  bindBuildChange: function(e) {  
    var that = this;
    this.setData({
      buildIndex: e.detail.value
    });
    wx.request({
      url: basePath+"/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: this.data.buildArray[e.detail.value],
        categoryId: e.detail.value
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success (res) {
        console.log(res.data);
        that.setData({
          projectList: res.data
        })
      }
    });
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
      let page = this
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