import Toast from '@vant/weapp/toast/toast';
var app = getApp();
var basePath = app.globalData.basePath;
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  mixins: [require('../../dist/mixin/themeChanged')],

  /**
   * 页面的初始数据
   */
  data: {
    projectNames: [], //@@
    projectNameList: [],
    projectName: "",
    notShowLimit: false,
    redMap: {}
  },

  //搜索框组件返回的方法 @@ 不通用，据情况改造
  inputTyping: function (e) {
    var that = this;
    var inputVal = e.detail.inputVal;
    var projectNames1 = [];
    if (inputVal.length > 0) {
      for (const nl of that.data.projectNameList) {
        var projectName = nl.projectName;
        if (projectName.indexOf(inputVal) != -1) {
          projectNames1.push(nl);
        }
      }
    }
    this.setData({
      projectNames: projectNames1
    })
  },
  //搜索框组件返回的方法 
  selectProject: function (e) {
    app.globalData.projectName = e.detail.projectName;
    app.globalData.projectId = e.detail.projectId;
    app.globalData.categoryType = e.detail.categoryType;
    this.setData({
      projectName: e.detail.projectName
    });
    this.getRedDotNum();
  },

  // 查看所有项目
  viewAll: function (e) {
    var that = this;
    app.globalData.projectId = 0;
    app.globalData.categoryType = 0;
    app.globalData.projectName = "";
    that.setData({
      projectName: ""
    });
    that.getRedDotNum();
  },

  //获取页面红点数
  getRedDotNum: function () {
    var that = this;
    wx.request({
      url: basePath + "/api/table/redDotNum", //请求路径
      method: 'post',
      data: {
        projectId: app.globalData.projectId
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        if(res.data.code === 200){
          that.setData({
            redMap: res.data.data
          })
        }
      }
    });
  },

  
  onLoad: function (options) {
    
  },

  onShow: function () {
    var that = this;
    if (app.globalData.hasUserInfo && app.globalData.userInfo.state == 1) {
      if(!that.data.notShowLimit){
        this.setData({
          projectName: app.globalData.projectName,
          notShowLimit: true
        });
        that.getRedDotNum();   
      }
    } else {
      that.setData({
        notShowLimit: false
      })
    }

    if (that.data.projectNameList.length <= 0) {
      request.post(requestUrl.nameListForTable, {}).then(res => {
        that.setData({
          projectNameList: res.data.projectNameList
        }) 
      })
    }
  },

  //问题建议
  toWtjy: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/wtjy/wtjy',
      })
    } else Toast.fail("未选择项目");
  },

  

  //督办事项
  toDbsx: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/dbsx/dbsx',
      })
    } else Toast.fail("未选择项目");
  },

  
  //图纸合同
  toTzht: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/tzwj/tzwj',
      })
    } else Toast.fail("未选择项目"); 
  },
  //施工助手
  toSgzs: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/htgl/htgl',
      })
    } else Toast.fail("未选择项目"); 
  },
  //图片图像
  toTptx: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/tptx/tptx',
      })
    } else Toast.fail("未选择项目"); 
  },

  //年度计划
  toNdjh: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/annualplan/annualplan',
      })
    } else Toast.fail("未选择项目");
  },
  //月度形象
  toYdxx: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/ydxx/ydxx',
      })
    } else Toast.fail("未选择项目");
  },
  //造价监控
  toZjjk: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/zjjk/zjjk',
      })
    } else Toast.fail("未选择项目");
  },
  //工期信息
  toGqxx: function(){
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/gqxx/gqxx',
      })
    } else Toast.fail("未选择项目");
  },
  // 安全检查
  toAqjc: function() {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/aqjc/aqjc',
      })
    } else Toast.fail("未选择项目");
  },

  // 质量检查
  toZljc: function() {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/zljc/zljc',
      })
    } else Toast.fail("未选择项目");
  },

  // 签证审批
  toQzsp: function() {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/qzsp/qzsp',
      })
    } else Toast.fail("未选择项目");
  },
  
})