Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    problemList: [
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
    ],

  },

  collapseChange: function (e) {
    this.setData({
      activeNames: e.detail,
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