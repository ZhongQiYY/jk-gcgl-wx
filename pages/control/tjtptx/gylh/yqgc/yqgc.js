// pages/control/tjtptx/gylh/yqgc/yqgc.js
const app = getApp();
var dateTimePicker = require('../../../../../utils/dateTimePicker.js');
var basePath = app.globalData.basePath;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
    hasPicture: 0,
    picUrls: '',
    files: [],
    show : true
  },

chooseImage1: function(e) {
  var that = this;
  wx.chooseImage({
    count: 9 - that.data.hasPicture, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let files = that.data.files.concat(tempFilePaths);
        if (files.length==9){
            that.setData({
                show:false
            })
        }
        that.setData({
            files: files,
            hasPicture: files.length,
        })
        that.upload(res);
    }
});
},
upload: function(res) {
  var that = this;
  const uploadTask = wx.uploadFile({
    url: basePath + '/api/tptx/upload/fileUpload?dir=image',
    filePath: res.tempFilePaths,
    name: 'file',
    header: { 
      'Content-Type': 'multipart/form-data',
      'thirdSession': app.globalData.thirdSession
      // 'X-Techpark-Token': wx.getStorageSync('token')
    },
    success: function(res) {
      var _res = JSON.parse(res.tempFilePaths);
      console.log(_res);
      if (_res.code ===200) {
        var url = _res.data
        that.setData({
          hasPicture:1,
          picUrls:url
        })
      }
    },
    fail: function(e) {
      wx.showModal({
        title: '错误',
        content: '上传失败',
        showCancel: false
      })
    },
  })

  uploadTask.onProgressUpdate((res) => {
    console.log('上传进度', res.progress)
    console.log('已经上传的数据长度', res.totalBytesSent)
    console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
  })
},
  // 删除图片
  clearImg1:function(e){
    var nowList1 = [];//新数据
    var uploaderList1 = this.data.files;//原数据
    for (let i = 0; i < uploaderList1.length;i++){
        if (i == e.currentTarget.dataset.index){
            continue;
        }else{
            nowList1.push(files[i])
        }
    }
    this.setData({
        hasPicture: this.data.hasPicture - 1,
        files: nowList1,
        show: true
    })
},
//展示图片
previewImage1:function(e){
    var that=this;
    wx.previewImage({
        urls: that.data.files,
        current: that.data.files[e.currentTarget.dataset.index]
    })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
  },
  changeDateTime(e){
    console.log(e)
    this.setData({ dateTime: e.detail.value });
  },

  changeDateTimeColumn(e){
    var arr = this.data.dateTime,
    dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
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
  submit: function(e) {
    let that = this;
    console.log(e)
    wx.request({
      //后台接口
      url: basePath + '/api/tptx/yqgc/insert',
      method: 'POST',
      data: {
        
      },
      header:{
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success: function(res) {
        console.log(res)
        if (res && res.data.code == 200) {
          wx.navigateBack()
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
      }
    });
  },
})