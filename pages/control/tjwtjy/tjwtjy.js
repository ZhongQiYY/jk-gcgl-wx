// pages/control/tjwtjy/tjwtjy.js
const app = getApp();
var basePath = app.globalData.basePath;
var dateTime = require('../../../utils/getDateTime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxProblemLength: 500,
    currentProblem: "",
    maxPlanLength: 500,
    currentPlan: "",
    projectNames: [], //@@
    projectId: "", //@@
    categoryType: "", //@@
    projectName: "" //@@
  },
  //输入问题建议时
  inputProblem: function (e) {
    if (e.detail.value.length > this.data.maxProblemLength) return;
    this.setData({
      currentProblem: e.detail.value
    })
  },
  //输入下一步工作计划时
  inputPlan: function (e) {
    if (e.detail.value.length > this.data.maxPlanLength) return;
    this.setData({
      currentPlan: e.detail.value
    })
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
      projectId: e.detail.projectId,
      categoryType: e.detail.categoryType,
      projectName: e.detail.projectName
    });
  },

  // 提交记录
  submitRecord: function(e){

    wx.navigateTo({
      url: '/pages/control/tjwtjy/commitRecord/commitRecord',
    })
    
  },

  //提交问题和计划
  submitProblemPlan: function () {
    var that = this;
    //获取当前时间
    var year = new Date().getFullYear();//获取年份 
    var month = new Date().getMonth() + 1;//获取月份
    var submitTime = dateTime.getymdhms(new Date(), '-', ':');

    if(that.data.projectId == ""){
      wx.showToast({
        title: '请选择项目',
        icon: 'none',
        duration: 1500
      })
    }else if(that.data.currentProblem == ""){
      wx.showToast({
        title: '请描述存在的问题',
        icon: 'none',
        duration: 1500
      })
    }else if(that.data.currentPlan == ""){
      wx.showToast({
        title: '请描述下一步工作计划',
        icon: 'none',
        duration: 1500
      })
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
          submitTime: submitTime
        },
        header: {
          'content-type': 'application/json', // 默认值
          'thirdSession': app.globalData.thirdSession
        },
        success(res) {
          if (res.data === "success") {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500
            })
            that.setData({
              currentProblem: "",
              currentPlan: "",
              projectId: "",
              categoryType: "",
              projectName: ""
            })
          }else{
            wx.showToast({
              title: '提交失败，服务器错误',
              icon: 'none',
              duration: 2000
            })
          }
        }
      });
    }
    
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})