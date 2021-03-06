const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitted:0, // 已提交
    reply:0, // 整改回复
    agree:0, // 同意
    disagree:0, // 不同意
    submittedList:[],
    replyList:[],
    agreeList:[],
    disagreeList:[]
  },

  toSubmitted: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/aqjc/aqjcView/aqjcView?status=1',
    })
  },

  toReply: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/aqjc/aqjcView/aqjcView?status=2',
    })
  },

  toAgree: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/aqjc/aqjcView/aqjcView?status=3',
    })
  },

  toDisagree: function() {
    wx.navigateTo({
      url: '/pages/tableData/datapages/aqjc/aqjcView/aqjcView?status=4',
    })
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
    var that = this
    request.get(requestUrl.listProblem, {'projectId':app.globalData.projectId})
      .then(res => { 
        console.log(res)
        if(res.code == 200) {
          let data = res.data;
          that.setData({
            submitted: data.submitted.length,  // 已提交
            reply: data.reply.length, // 整改回复
            agree: data.agree.length, // 同意
            disagree: data.disagree.length, // 不同意
            submittedList: data.submitted,
            replyList: data.reply,
            agreeList: data.agree,
            disagreeList: data.disagree
          });
          // 设置全局变量
          app.globalData.submittedList = data.submitted
          app.globalData.replyList = data.reply
          app.globalData.agreeList = data.agree
          app.globalData.disagreeList = data.disagree
        }
      }).catch()
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