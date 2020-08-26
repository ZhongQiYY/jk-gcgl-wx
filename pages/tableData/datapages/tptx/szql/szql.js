// pages/tableData/datapages/tptx/szql/szql.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  
  /**
   * 桥涵工程
   */
  toDetailsAndQhgc: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/szql/qhgc/qhgc'
    })
  },

  /**
   * 道路工程
   */
  toDetailsAndDlgc: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/szql/dlgc/dlgc'
    })
  },
  /**
   * 给排水工程
   */
  toDetailsAndJpsgc: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/szql/jpsgc/jpsgc'
    })
  },

  /**
   * 配套工程
   */
  toDetailsAndPtgc: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/szql/ptgc/ptgc'
    })
  },
})