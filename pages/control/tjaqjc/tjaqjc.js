var dateTime = require('../../../utils/getDateTime.js');
const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  data: {
    projectNames: [], //@@
    projectName: '',//项目名称
    projectId: '',//项目id
    categoryType: '',//项目类别
    active: 0,//tabbar索引
    date: '',
    show: false,
    showOther: true,
    activeNames: ['1'],
    maxProblemLength: 500,//当前问题描述长度
    currentProblem: '',//当前输入的问题描述

    currentScore: '',//当前输入的扣分数
    problemPlanList:[
      {
        unitName: "综保区", projectName: "标准厂房三期", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-08-27", commitName: "刘杭"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-09-27", commitName: "缪隽峰"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
        ]
      },
      {
        unitName: "满园", projectName: "水韵康居四期项目", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-08-27", commitName: "刘杭"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-09-27", commitName: "缪隽峰"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
        ]
      },
      {
        unitName: "满园", projectName: "香江棚户区改造安居小区", timeNameList: [
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-09-27", commitName: "缪隽峰"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
        ]
      },
      {
        unitName: "西城", projectName: "工业路（客家大道-赣丰路）", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
        ]
      },
      {
        unitName: "中恒工业", projectName: "金凤智谷一期项目", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
        ]
      },
      {
        unitName: "中恒商业", projectName: "蟠龙返乡创业基地项目西地块", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
        ]
      },
      {
        unitName: "磊昇", projectName: "赣州经济技术开发区第一中学新建工程", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
        ]
      },
    ],
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
  //搜索框组件返回的方法 @@
  selectProject: function (e) {
    this.setData({
      projectName: e.detail.projectName,
      projectId: e.detail.projectId,
      categoryType: e.detail.categoryType
    })
  },

  // 输入问题描述时
  inputProblem: function(e){
    var that = this;
    that.setData({
      currentProblem: e.detail
    })
  },

  // 输入扣分数时
  inputScore: function(e){
    var that = this;
    that.setData({
      currentScore: e.detail
    })
  },

  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail,
      showOther: !that.data.showOther
    })
  },
  collapseChange: function(e){
    this.setData({
      activeNames: e.detail,
    });
  },

  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return dateTime.getymdhms(date, '-', ':');
  },
  onConfirm(e) {
    this.setData({
      show: false,
      date: this.formatDate(e.detail),
    });
  },
  
})