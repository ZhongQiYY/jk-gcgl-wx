Page({
  /**
   * 页面的初始数据
   */
  data: {
    records:[
      {
        id:'1',
        content:'哈哈哈哈哈哈',
        finalTime:'2020-07-14',
        zb:'喜子软件1',
        xb:'计划统计部1'
      },
      {
        id:'2',
        content:'xixi',
        finalTime:'2020-07-15',
        zb:'喜子软件2',
        xb:'计划统计部2'
      },
      {
        id:'3',
        content:'hehe',
        finalTime:'2020-07-16',
        zb:'喜子软件3',
        xb:'计划统计部3'
      }
    ],
  },

  toDetails: function() {
    wx.navigateTo({
      url: '/pages/dcdb/details/details',
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
   * 搜索日期给初值
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