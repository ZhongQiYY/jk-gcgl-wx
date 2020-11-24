var app = getApp();
var basePath = app.globalData.basePath;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPopup: false,
    processedInfo:[],//已处理
    unprocessedInfo:[],//未处理
    filterName: "全部",//过滤的名字
    projectName: ""
  },

  onLoad: function(){
    var that = this;
    that.setData({
      projectName: app.globalData.projectName
    })

  },

  //picker点击取消
  onCancel: function(){
    this.setData({
      showPopup: false
    })
  },


  showPopup: function(){
    this.setData({
      showPopup: true
    })
  },
  popupClose: function(){
    this.setData({
      showPopup: false
    })
  }
    

})