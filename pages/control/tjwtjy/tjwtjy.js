// pages/control/tjwtjy/tjwtjy.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxProblemLength: 500,
    currentProblemLength: 0,
    maxPlanLength: 500,
    currentPlanLength: 0,
    projectNames: [], //@@
    projectId: "", //@@
    categoryType: "", //@@
    projectName: "" //@@
  },
  //输入问题建议时计算当前字数
  inputProblem: function (e) {
    var len = e.detail.value.length;
    if (len > this.data.maxProblemLength) return;
    this.setData({
      currentProblemLength: len
    })
  },
  //输入下一步工作计划时计算当前字数
  inputPlan: function (e) {
    var len = e.detail.value.length;
    if (len > this.data.maxPlanLength) return;
    this.setData({
      currentPlanLength: len
    })
  },

  //搜索框组件返回的方法 @@
  inputTyping: function(e){
    var inputVal = e.detail.inputVal;
    var nameList = app.globalData.projectNameList;
    var projectNames1 = [];
    for (const nl of nameList) {
      var projectName = nl.projectName;
      if(projectName.indexOf(inputVal) != -1){
        projectNames1.push(nl);
      }
    }
    this.setData({
      projectNames: projectNames1
    })
  },
  //搜索框组件返回的方法 @@
  selectProject: function(e){
    this.setData({
      projectId: e.detail.projectId,
      categoryType: e.detail.categoryType,
      projectName: e.detail.projectName
    });
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