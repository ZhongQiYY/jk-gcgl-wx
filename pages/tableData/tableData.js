// pages/tableData/tableData.js
var app = getApp();
var basePath = app.globalData.basePath;
Page({

  mixins: [require('../../dist/mixin/themeChanged')],

  /**
   * 页面的初始数据
   */
  data: {
    projectNames: [], //@@
    projectName: "",
    notShowLimit: false,
    redMap: {}
  },

  //搜索框组件返回的方法 @@
  inputTyping: function (e) {
    var inputVal = e.detail.inputVal;
    var projectNames1 = [];
    if (inputVal.length > 0) {
      for (const nl of app.globalData.projectNameList) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = app.globalData.projectNameList;
    if (list.length <= 0) {
      wx.request({
        url: basePath + "/api/project/nameList", //请求路径
        method: 'post',
        data: {

        },
        header: {
          'content-type': 'application/json', // 默认值
          'thirdSession': app.globalData.thirdSession
        },
        success(res) {
          app.globalData.projectNameList = res.data
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (app.globalData.hasUserInfo && app.globalData.userInfo.state == 1) {
      this.setData({
        projectName: app.globalData.projectName,
        notShowLimit: true
      });
      that.getRedDotNum();
    } else {
      that.setData({
        notShowLimit: false
      })
    }
  },

  //年度计划
  toNdjh: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/annualplan/annualplan',
      })
    } else app.showToast("请先选定项目");
  },

  //督办事项
  toDbsx: function () {
    wx.navigateTo({
      url: '/pages/control/dcdb/dcdb',
    })
  },

  //图纸文件
  toTzwj: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tzwj/tzwj',
    })
  },

  //合同管理
  toHtgl: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/htgl/htgl',
    })
  },

  //图片图像
  toTptx: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/tptx',
    })
  },

  //造价监控
  toZjjk: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/zjjk/zjjk',
      })
    } else app.showToast("请先选定项目");
  },

  //数据统计
  toSjtj: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/sjtj/sjtj',
      })
    } else app.showToast("请先选定项目");
  },

  //月度形象
  toYdxx: function () {
    if (app.globalData.projectId != 0 && app.globalData.categoryType != 0) {
      wx.navigateTo({
        url: '/pages/tableData/datapages/ydxx/ydxx',
      })
    } else app.showToast("请先选定项目");
  },

  //提醒事项
  toTxsx: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/txsx/txsx',
    })
  },
})