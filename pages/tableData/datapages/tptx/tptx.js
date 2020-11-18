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
    })
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