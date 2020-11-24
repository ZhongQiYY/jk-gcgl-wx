const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
var basePath = app.globalData.basePath;
// var basePath = app.globalData.imageRootPath;
import Toast from '@vant/weapp/toast/toast';

var lock = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 签证审批id
    visaApprove: {}, // 签证审批对象
    visaCode: '',
    actualizeSituation: '',
    surveyor: '',
    changeSite: '',
    changeReason: '',
    changeMoney: '',
    changeProperty: '',
    changeContent: '',
    show: false, //是否展示同意拒绝按钮
    hasPicture1: 0,
    picUrls1: [],
    files1: [],
    show1: true,
  },

  getVisaCode: function (e) {
    var that = this;
    that.setData({
      visaCode: e.detail
    })
  },
  getSituation: function (e) {
    var that = this;
    that.setData({
      actualizeSituation: e.detail
    })
  },
  getSurveyor: function (e) {
    var that = this;
    that.setData({
      surveyor: e.detail
    })
  },
  getChangeSite: function (e) {
    var that = this;
    that.setData({
      changeSite: e.detail
    })
  },
  getChangeReason: function (e) {
    var that = this;
    that.setData({
      changeReason: e.detail
    })
  },
  getChangeMoney: function (e) {
    var that = this;
    that.setData({
      changeMoney: e.detail
    })
  },
  getChangeProperty: function (e) {
    var that = this;
    that.setData({
      changeProperty: e.detail
    })
  },
  getChangeContent: function (e) {
    var that = this;
    console.log(e.detail)
    that.setData({
      changeContent: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      id: options.id,
      show: false
    });
    request.get(requestUrl.getVisaById, { 'id': that.data.id }).then(res => {
      console.log(res)
      that.setData({
        visaApprove: res.data,
      })
    }, err => { });
  },

  // 同意整改回复
  agree: function () {
    var that = this
    let data = {
      visaId: this.data.id,
      status: 2
    }
    request.post(requestUrl.updateVisaStatus, data).then(res => {
      Toast.success('提交成功');
      that.setData({
        show: true
      });
      var pages = getCurrentPages();//获取页面栈
      if (pages.length > 2) {
        wx.navigateBack({         //返回上一页  
          delta: 2
        })
      }
    }, err => {
      Toast.fail('提交失败，服务器错误');
      that.setData({
        show: true
      })
    });
  },

  // 不同意整改回复
  disagree: function () {
    var that = this
    let data = {
      visaId: this.data.id,
      status: 3
    }
    request.post(requestUrl.updateVisaStatus, data).then(res => {
      Toast.success('提交成功');
      that.setData({
        show: true
      });
      var pages = getCurrentPages();//获取页面栈
      if (pages.length > 2) {
        wx.navigateBack({         //返回上一页  
          delta: 2
        })
      }
    }, err => {
      Toast.fail('提交失败，服务器错误');
      that.setData({
        show: true
      });
    });
  },

  // 更新签证审批
  updateVisa: function () {
    if (lock) {
      // 上锁
      lock = false

      var that = this
      var picUrls1 = that.data.picUrls1
      var imageList = [];
      var map = {};
      var imageName = '';
      var imageUrl = '';
      for (var i = 0; i < picUrls1.length; i++) {
        imageName = picUrls1[i].split("/")[5];
        map.imageName = imageName;
        imageUrl = picUrls1[i];
        map.imageUrl = imageUrl;
        imageList[i] = map
      }
      var data = {
        id: that.data.id,
        projectId: Number(that.data.visaApprove.projectId),
        visaCode: that.data.visaCode,
        actualizeSituation: that.data.actualizeSituation,
        surveyor: that.data.surveyor,
        changeSite: that.data.changeSite,
        changeReason: that.data.changeReason,
        changeMoney: Number(that.data.changeMoney),
        changeProperty: that.data.changeProperty,
        changeContent: that.data.changeContent,
        imageList: imageList,
      }
      request.post(requestUrl.updateVisa, data)
        .then(res => {
          Toast.success('提交成功');
          var pages = getCurrentPages();//获取页面栈
          if (pages.length > 2) {
            wx.navigateBack({         //返回上一页  
              delta: 2
            });
          }

          // 释放锁
          lock = true
        }, err => {
          // 释放锁
          lock = true
          Toast.fail('提交失败，服务器错误');
        });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //选择图片
  chooseImage1: function (e) {
    var that = this;
    if (this.data.files1.length > 9) {
      app.showToast('一次性最多只能上传9张图片');
      return false;
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let files1 = that.data.files1.concat(res.tempFilePaths);
        if (files1.length == 9) {
          that.setData({
            show1: false
          })
        }
        console.log('files1', files1)
        that.setData({
          files1: files1,
          hasPicture1: files1.length,
        })
        that.upload1(res);
      }
    });
  },
  //上传图片
  upload1: function (res) {
    var that = this;
    console.log(res.tempFilePaths);
    const uploadTask = wx.uploadFile({
      url: basePath + '/api/control/aqjc/upload/fileUpload?dir=image',
      filePath: res.tempFilePaths[0],
      name: 'file',
      header: {
        'Content-Type': 'multipart/form-data',
        'thirdSession': app.globalData.thirdSession
      },
      success: function (res) {
        var _res = JSON.parse(res.data);
        console.log(_res);
        if (_res.code === 200) {
          var url = _res.data
          that.data.picUrls1.push(url);
          that.setData({
            hasPicture1: that.data.files1.length,
          })
        }
      },
      fail: function (e) {
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
  clearImg1: function (e) {
    var nowList1 = [];//新数据
    var uploaderList1 = this.data.files1;//原数据
    for (let i = 0; i < uploaderList1.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
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
  previewImage1: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.files1,
      current: that.data.files1[e.currentTarget.dataset.index]
    })
  },

})