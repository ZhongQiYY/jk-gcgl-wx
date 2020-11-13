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
    fileList: [], // 图片文件
    problemPlanList: [
      {
        unitName: "综保区", projectName: "标准厂房三期", timeNameList: [
          { submitTime: "2020-09-27", commitName: "钟祺" },
          { submitTime: "2020-08-27", commitName: "刘杭" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-11-27", commitName: "高镪" },
          { submitTime: "2020-09-27", commitName: "缪隽峰" },
          { submitTime: "2020-12-27", commitName: "温龙飞" },
          { submitTime: "2020-11-27", commitName: "高镪" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-12-27", commitName: "温龙飞" },
        ]
      },
      {
        unitName: "满园", projectName: "水韵康居四期项目", timeNameList: [
          { submitTime: "2020-09-27", commitName: "钟祺" },
          { submitTime: "2020-08-27", commitName: "刘杭" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-11-27", commitName: "高镪" },
          { submitTime: "2020-09-27", commitName: "缪隽峰" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-12-27", commitName: "温龙飞" },
        ]
      },
      {
        unitName: "满园", projectName: "香江棚户区改造安居小区", timeNameList: [
          { submitTime: "2020-11-27", commitName: "高镪" },
          { submitTime: "2020-09-27", commitName: "缪隽峰" },
          { submitTime: "2020-12-27", commitName: "温龙飞" },
          { submitTime: "2020-11-27", commitName: "高镪" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-12-27", commitName: "温龙飞" },
        ]
      },
      {
        unitName: "西城", projectName: "工业路（客家大道-赣丰路）", timeNameList: [
          { submitTime: "2020-09-27", commitName: "钟祺" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-11-27", commitName: "高镪" },
        ]
      },
      {
        unitName: "中恒工业", projectName: "金凤智谷一期项目", timeNameList: [
          { submitTime: "2020-09-27", commitName: "钟祺" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-11-27", commitName: "高镪" },
        ]
      },
      {
        unitName: "中恒商业", projectName: "蟠龙返乡创业基地项目西地块", timeNameList: [
          { submitTime: "2020-09-27", commitName: "钟祺" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-11-27", commitName: "高镪" },
        ]
      },
      {
        unitName: "磊昇", projectName: "赣州经济技术开发区第一中学新建工程", timeNameList: [
          { submitTime: "2020-09-27", commitName: "钟祺" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-11-27", commitName: "高镪" },
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
  inputProblem: function (e) {
    var that = this;
    that.setData({
      currentProblem: e.detail
    })
  },

  // 输入扣分数时
  inputScore: function (e) {
    var that = this;
    that.setData({
      currentScore: e.detail
    })
  },

  tabbarChange: function (e) {
    var that = this;
    that.setData({
      active: e.detail,
      showOther: !that.data.showOther
    })
  },
  collapseChange: function (e) {
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
    return dateTime.getymd(date, '-');
  },
  onConfirm(e) {
    this.setData({
      show: false,
      date: this.formatDate(e.detail),
    });
  },

  // 提交问题
  submitProblemPlan() {
    var that = this
    var data = {
      projectId: Number(that.data.projectId),
      description: that.data.currentProblem,
      score: Number(that.data.currentScore),
      finalTime: that.data.date,
      imageList: [
        {
          imageName: 'photo.jpg',
          imageUrl: 'http://localhost:16000/photo.jpg'
        }
      ],
    }
    request.post(requestUrl.commitProblem, data)
      .then(res => { 
        console.log(res)
        if(res.code == 200) {
          console.log('请求成功')
        } else {
          console.log('请求失败')
        }
      })
      .catch(err => { })
  },

  // 图片上传
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },

})