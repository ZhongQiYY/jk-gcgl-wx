const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    unitName: '',
    projectName: '',
    timeNameList: [],
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
    var that = this
    let data = {
      'status': options.status,
      'projectId': app.globalData.projectId
    }
    request.get(requestUrl.listVisaByStatus, data).then(res => {
      if (res.data.length > 0) {
        that.setData({
          unitName: res.data[0].project.unitName,
          projectName: res.data[0].project.projectName,
          timeNameList: res.data
        })
      }
    }, err => {

    });
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

})