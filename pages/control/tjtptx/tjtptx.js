// pages/control/tjtptx/tjtptx.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploaderList: [],
    uploaderNum:0,
    showUpload:true,
    projectNames: [], //@@
    projectId: "", //@@
    categoryType: "", //@@
    projectName: "" //@@
  },
  //搜索框组件返回的方法 @@
  inputTyping: function(e){
    var inputVal = e.detail.inputVal;
    var nameList = app.globalData.projectNameList;
    var projectNames1 = [];
    for (const nl of nameList) {
      var projectName = nl.projectName;
      if(projectName.indexOf(inputVal) != -1){
        projectNames1.push(nl);
      }
    }
    this.setData({
      projectNames: projectNames1
    })
  },
  //搜索框组件返回的方法 @@
  selectProject: function(e){
    app.globalData.pId =  e.detail.projectId,
    this.setData({
      projectId: e.detail.projectId,
      categoryType: e.detail.categoryType,
      projectName: e.detail.projectName
    });
  },

   // 删除图片
   clearImg:function(e){
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据
    
    for (let i = 0; i < uploaderList.length;i++){
        if (i == e.currentTarget.dataset.index){
            continue;
        }else{
            nowList.push(uploaderList[i])
        }
    }
    this.setData({
        uploaderNum: this.data.uploaderNum - 1,
        uploaderList: nowList,
        showUpload: true
    })
},
//展示图片
showImg:function(e){
    var that=this;
    wx.previewImage({
        urls: that.data.uploaderList,
        current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
},
//上传图片
upload: function(e) {
    var that = this;
    wx.chooseImage({
        count: 9 - that.data.uploaderNum, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
            console.log(res)
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            let tempFilePaths = res.tempFilePaths;
            let uploaderList = that.data.uploaderList.concat(tempFilePaths);
            if (uploaderList.length==9){
                that.setData({
                    showUpload:false
                })
            }
            that.setData({
                uploaderList: uploaderList,
                uploaderNum: uploaderList.length,
            })
        }
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
  toDetailsAndFjl: function (){
    wx.navigateTo({
      url: '/pages/control/tjtptx/fjl/fjl'
    })
  },
  /**
   * 公园绿化类
   */
  toDetailsAndGylhl: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/gylh/gylh'
    })
  },

  /**
   * 市政桥梁类
   */
  toDetailsAndSzqll: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/szql/szql'
    })
  },
})