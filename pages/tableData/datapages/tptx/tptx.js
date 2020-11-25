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
        desc: '图片',
        text: '2020-11-22 18:20:19',
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
    })
  },

})