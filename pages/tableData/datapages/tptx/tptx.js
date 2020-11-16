const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
var basePath = app.globalData.basePath
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        desc: '步骤一',
        text: '描述信息',
      }
    ],
    pmNbtstList: [],
    pmFstList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.projectId)
    request.get(requestUrl.tptxList,{ projectId : app.globalData.projectId}).then(res => {
      console.log(res.data)
      if(res.code == 200) {
        if(res.data.length > 0) {
          that.setData({
            pmNbtstList: res.data.pmNbtstList,
            pmFstList: res.data.pmFstList
          })
        }
      }
    }).catch(err => {});

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
   * 房建类
   */
  toDetailsAndFjl: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/fjl/fjl'
    })
  },
  /**
   * 公园绿化类
   */
  toDetailsAndGylhl: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/gylh/gylh'
    })
  },

  /**
   * 市政桥梁类
   */
  toDetailsAndSzqll: function () {
    wx.navigateTo({
      url: '/pages/tableData/datapages/tptx/szql/szql'
    })
  },
})