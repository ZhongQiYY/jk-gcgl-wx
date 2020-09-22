const app = getApp();
var dateTimePicker1 = require('../../../../../../utils/dateTimePicker.js');
var dateTimePicker2 = require('../../../../../../utils/dateTimePicker.js');
var dateTimePicker3 = require('../../../../../../utils/dateTimePicker.js');
var basePath = app.globalData.basePath;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startYear: 2000,
    endYear: 2050,

    dateTimeArray1: null,
    dateTime1: null,
    hasPicture1: 0,
    picUrls1: [],
    files1: [],
    show1 : true,

    dateTimeArray2: null,
    dateTime2: null,
    hasPicture2: 0,
    picUrls2: [],
    files2: [],
    show2 : true,

    dateTimeArray3: null,
    dateTime3: null,
    hasPicture3: 0,
    picUrls3: [],
    files3: [],
    show3 : true
  },

  //前期
chooseImage1: function(e) {
  var that = this;
  if(this.data.files1.length>9){
    app.showToast('一次性最多只能上传9张图片');
    return false;
  }
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let files1 = that.data.files1.concat(res.tempFilePaths);
        if (files1.length==9){
            that.setData({
                show1:false
            })
        }
        that.setData({
            files1: files1,
            hasPicture1: files1.length,
        })
        that.upload1(res);
    }
});
},
upload1: function(res) {
  var that = this;
  console.log(res.tempFilePaths);
    const uploadTask = wx.uploadFile({
      url: basePath + '/api/tptx/ptyf/upload/fileUpload?dir=image',
      filePath: res.tempFilePaths[0],
      name: 'file',
      header: { 
        'Content-Type': 'multipart/form-data',
        'thirdSession': app.globalData.thirdSession
      },
      success: function(res) {
        var _res = JSON.parse(res.data);
        console.log(_res);
        if (_res.code ===200) {
          var url = _res.data
          that.data.picUrls1.push(url);
          that.setData({
            hasPicture1: that.data.files1.length,
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
    var uploaderList1 = this.data.files1;//原数据
    for (let i = 0; i < uploaderList1.length;i++){
        if (i == e.currentTarget.dataset.index){
            continue;
        }else{
            nowList1.push(uploaderList1[i])
        }
    }
    this.setData({
        hasPicture1: this.data.hasPicture1 - 1,
        files1: nowList1,
        show1: true
    })
},
//展示图片
previewImage1:function(e){
    var that=this;
    wx.previewImage({
        urls: that.data.files1,
        current: that.data.files1[e.currentTarget.dataset.index]
    })
},
//修改时间
changeDateTime1(e){
  console.log(e)
  this.setData({ dateTime1: e.detail.value });
},
//修改日期
changeDateTimeColumn1(e){
  var arr = this.data.dateTime1,
  dateArr = this.data.dateTimeArray1;
  arr[e.detail.column] = e.detail.value;
  dateArr[2] = dateTimePicker1.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  this.setData({
    dateTimeArray1: dateArr,
    dateTime1: arr
  });
},


//中期
chooseImage2: function(e) {
  var that = this;
  if(this.data.files2.length>9){
    app.showToast('一次性最多只能上传9张图片');
    return false;
  }
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let files2 = that.data.files2.concat(res.tempFilePaths);
        if (files2.length==9){
            that.setData({
                hasPicture2:false
            })
        }
        that.setData({
            files2: files2,
            hasPicture2: files2.length,
        })
        that.upload2(res);
    }
});
},
upload2: function(res) {
  var that = this;
  console.log(res.tempFilePaths);
    const uploadTask = wx.uploadFile({
      url: basePath + '/api/tptx/ptyf/upload/fileUpload?dir=image',
      filePath: res.tempFilePaths[0],
      name: 'file',
      header: { 
        'Content-Type': 'multipart/form-data',
        'thirdSession': app.globalData.thirdSession
      },
      success: function(res) {
        var _res = JSON.parse(res.data);
        console.log(_res);
        if (_res.code ===200) {
          var url = _res.data
          that.data.picUrls2.push(url);
          that.setData({
            hasPicture2: that.data.files2.length,
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
  clearImg2:function(e){
    var nowList2 = [];//新数据
    var uploaderList2 = this.data.files2;//原数据
    for (let i = 0; i < uploaderList2.length;i++){
        if (i == e.currentTarget.dataset.index){
            continue;
        }else{
            nowList2.push(uploaderList2[i])
        }
    }
    this.setData({
        hasPicture2: this.data.hasPicture2 - 1,
        files2: nowList2,
        hasPicture2: true
    })
},
//展示图片
previewImage2:function(e){
    var that=this;
    wx.previewImage({
        urls: that.data.files2,
        current: that.data.files2[e.currentTarget.dataset.index]
    })
},

changeDateTime2(e){
  console.log(e)
  this.setData({ dateTime2: e.detail.value });
},

changeDateTimeColumn2(e){
  var arr = this.data.dateTime2,
  dateArr = this.data.dateTimeArray2;
  arr[e.detail.column] = e.detail.value;
  dateArr[2] = dateTimePicker2.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

  this.setData({
    dateTimeArray2: dateArr,
    dateTime2: arr
  });
},


//后期

chooseImage3: function(e) {
  var that = this;
  if(this.data.files3.length>9){
    app.showToast('一次性最多只能上传9张图片');
    return false;
  }
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let files3 = that.data.files3.concat(res.tempFilePaths);
        if (files3.length==9){
            that.setData({
                hasPicture3:false
            })
        }
        that.setData({
            files3: files3,
            hasPicture3: files3.length,
        })
        that.upload3(res);
    }
});
},
upload3: function(res) {
  var that = this;
  console.log(res.tempFilePaths);
    const uploadTask = wx.uploadFile({
      url: basePath + '/api/tptx/ptyf/upload/fileUpload?dir=image',
      filePath: res.tempFilePaths[0],
      name: 'file',
      header: { 
        'Content-Type': 'multipart/form-data',
        'thirdSession': app.globalData.thirdSession
      },
      success: function(res) {
        var _res = JSON.parse(res.data);
        console.log(_res);
        if (_res.code ===200) {
          var url = _res.data
          that.data.picUrls3.push(url);
          that.setData({
            hasPicture3: that.data.files3.length,
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
  clearImg3:function(e){
    var nowList3 = [];//新数据
    var uploaderList3 = this.data.files3;//原数据
    for (let i = 0; i < uploaderList3.length;i++){
        if (i == e.currentTarget.dataset.index){
            continue;
        }else{
            nowList3.push(uploaderList3[i])
        }
    }
    this.setData({
        hasPicture3: this.data.hasPicture3 - 1,
        files3: nowList3,
        hasPicture3: true
    })
},
//展示图片
previewImage3:function(e){
    var that=this;
    wx.previewImage({
        urls: that.data.files3,
        current: that.data.files3[e.currentTarget.dataset.index]
    })
},

changeDateTime3(e){
  console.log(e)
  this.setData({ dateTime3: e.detail.value });
},

changeDateTimeColumn3(e){
  var arr = this.data.dateTime3,
  dateArr = this.data.dateTimeArray3;
  arr[e.detail.column] = e.detail.value;
  dateArr[2] = dateTimePicker3.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

  this.setData({
    dateTimeArray3: dateArr,
    dateTime3: arr
  });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker1.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj2 = dateTimePicker2.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj3 = dateTimePicker3.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      dateTime1: obj1.dateTime,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime2: obj2.dateTime,
      dateTimeArray2: obj2.dateTimeArray,
      dateTime3: obj3.dateTime,
      dateTimeArray3: obj3.dateTimeArray,
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
    console.log(that.data)
    let year1 = that.data.dateTimeArray1[0][that.data.dateTime1[0]];
    let month1 = that.data.dateTimeArray1[1][that.data.dateTime1[1]];
    let day1 = that.data.dateTimeArray1[2][that.data.dateTime1[2]];
    let hour1 = that.data.dateTimeArray1[3][that.data.dateTime1[3]];
    let min1 = that.data.dateTimeArray1[4][that.data.dateTime1[4]];
    let sec1 = that.data.dateTimeArray1[5][that.data.dateTime1[5]];
    let time1 = year1+"-"+month1+"-"+day1+" "+hour1+":"+min1+":"+sec1;

    let year2 = that.data.dateTimeArray2[0][that.data.dateTime2[0]];
    let month2 = that.data.dateTimeArray2[1][that.data.dateTime2[1]];
    let day2 = that.data.dateTimeArray2[2][that.data.dateTime2[2]];
    let hour2 = that.data.dateTimeArray2[3][that.data.dateTime2[3]];
    let min2 = that.data.dateTimeArray2[4][that.data.dateTime2[4]];
    let sec2 = that.data.dateTimeArray2[5][that.data.dateTime2[5]];
    let time2 = year2+"-"+month2+"-"+day2+" "+hour2+":"+min2+":"+sec2;

    let year3 = that.data.dateTimeArray3[0][that.data.dateTime3[0]];
    let month3 = that.data.dateTimeArray3[1][that.data.dateTime3[1]];
    let day3 = that.data.dateTimeArray3[2][that.data.dateTime3[2]];
    let hour3 = that.data.dateTimeArray3[3][that.data.dateTime3[3]];
    let min3 = that.data.dateTimeArray3[4][that.data.dateTime3[4]];
    let sec3 = that.data.dateTimeArray3[5][that.data.dateTime3[5]];
    let time3 = year3+"-"+month3+"-"+day3+" "+hour3+":"+min3+":"+sec3;
    wx.request({
      //后台接口
      url: basePath + '/api/tptx/ptyf/pspw/insert',
      method: 'POST',
      data: {
        pId: 14,
        picUrls1: that.data.picUrls1,
        picUrls2: that.data.picUrls2,
        picUrls3: that.data.picUrls3,
        time1: time1,
        time2: time2,
        time3: time3,
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
  