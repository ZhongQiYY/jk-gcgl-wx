// pages/control/tjtptx/tjtptx.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    projectNames: [], //@@
    projectId: "", //@@
    categoryType: "", //@@
    projectName: "" //@@
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
    app.globalData.pId =  e.detail.projectId,
    this.setData({
      projectId: e.detail.projectId,
      categoryType: e.detail.categoryType,
      projectName: e.detail.projectName
    });
  },
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

  },
})