// pages/control/tjwtjy/tjwtjy.js
const app = getApp();
var basePath = app.globalData.basePath;
var dateTime = require('../../../utils/getDateTime.js');
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxProblemLength: 500,//最大问题提交长度
    maxPlanLength: 500,//最大计划提交长度
    currentProblem: "",//当前输入的问题文字
    currentPlan: "",//当前输入的计划文字
    projectName:"",//项目名称
    
    active: 0,//tabbar索引
    showOther: true,
    activeNames: ['1'],
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
  //输入问题建议时
  inputProblem: function (e) {
    if (e.detail.length > this.data.maxProblemLength) return;
    this.setData({
      currentProblem: e.detail
    })
  },
  //输入下一步工作计划时
  inputPlan: function (e) {
    if (e.detail.length > this.data.maxPlanLength) return;
    this.setData({
      currentPlan: e.detail
    })
  },
  //提交问题和计划
  submitProblemPlan: function () {
    var that = this;
    //获取当前时间
    var year = new Date().getFullYear();//获取年份 
    var month = new Date().getMonth() + 1;//获取月份
    var submitTime = dateTime.getymdhms(new Date(), '-', ':');

    if(app.globalData.pId == "" || app.globalData.pId == 0){
      Toast.fail('请选择项目');
    }else if(that.data.currentProblem == ""){
      Toast.fail('请描述存在的问题');
    }else if(that.data.currentPlan == ""){
      Toast.fail('请描述下一步工作计划');
    }else{
      wx.request({
        url: basePath + "/api/control/submitProblemPlan", //请求路径
        method: 'post',
        data: {
          status: 1,
          projectId: that.data.projectId,
          existProblem: that.data.currentProblem,
          nextPlan: that.data.currentPlan,
          submitYear: year,
          submitMonth: month,
          submitTime: submitTime,
          projectName: that.data.projectName,
          unitName: app.globalData.userInfo.company
        },
        header: {
          'content-type': 'application/json', // 默认值
          'thirdSession': app.globalData.thirdSession
        },
        success(res) {
          if (res.data === "success") {
            Toast.success('提交成功');
            that.setData({
              currentProblem: "",
              currentPlan: "",
            })
          }else{
            Toast.fail('提交失败，服务器错误');
          }
        }
      });
    }
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

  // 提交记录
  submitRecord: function(e){
    wx.navigateTo({
      url: '/pages/control/tjwtjy/commitRecord/commitRecord',
    }) 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      projectName: app.globalData.pName
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
})