const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitted: 0, // 已提交
    agree: 0, // 同意
    disagree: 0, // 不同意
  },

  toSubmitted: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/qzsp/qzspView/qzspView?status=1',
    })
  },

  toAgree: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/qzsp/qzspView/qzspView?status=2',
    })
  },

  toDisagree: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/qzsp/qzspView/qzspView?status=3',
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
    request.get(requestUrl.listVisa, { 'projectId': app.globalData.projectId })
      .then(res => {
        let data = res.data;
        that.setData({
          submitted: data.submitted,  // 已提交
          agree: data.agree, // 同意
          disagree: data.disagree, // 不同意
        });
      }, err => { });
  },

})