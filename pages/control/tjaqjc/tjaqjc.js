var dateTime = require('../../../utils/getDateTime.js');
const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
// var basePath = app.globalData.imageRootPath;
var basePath = app.globalData.basePath;
import Toast from '@vant/weapp/toast/toast';

// 设置锁变量
var lock = true
Page({

  data: {
    projectNames: [], //@@
    projectName: '',//项目名称
    projectId: '',//项目id
    categoryType: '',//项目类别
    active: 0,//tabbar索引
    date: '',
    show: false,
    showOther: true,
    activeNames: ['1'],
    maxProblemLength: 500,//当前问题描述长度
    currentProblem: '',//当前输入的问题描述
    currentScore: '',//当前输入的扣分数
    hasPicture1: 0,
    picUrls1: [],
    files1: [],
    show1: true,
    problemPlanList: []
  },

  //搜索框组件返回的方法 @@
  inputTyping: function (e) {
    var inputVal = e.detail.inputVal;
    var projectNames1 = [];
    if (inputVal.length > 0) {
      for (const nl of app.globalData.projectNameList) {
        var projectName = nl.projectName;
        if (projectName.indexOf(inputVal) != -1) {
          projectNames1.push(nl);
        }
      }
    }
    this.setData({
      projectNames: projectNames1
    })
  },
  //搜索框组件返回的方法 @@
  selectProject: function (e) {
    this.setData({
      projectName: e.detail.projectName,
      projectId: e.detail.projectId,
      categoryType: e.detail.categoryType
    })
  },

  // 输入问题描述时
  inputProblem: function (e) {
    var that = this;
    that.setData({
      currentProblem: e.detail
    })
  },

  // 输入扣分数时
  inputScore: function (e) {
    var that = this;
    that.setData({
      currentScore: e.detail
    })
  },

  tabbarChange: function (e) {
    var that = this;
    that.setData({
      active: e.detail,
      showOther: !that.data.showOther
    })
  },
  collapseChange: function (e) {
    this.setData({
      activeNames: e.detail,
    });
  },

  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return dateTime.getymd(date, '-');
  },
  onConfirm(e) {
    this.setData({
      show: false,
      date: this.formatDate(e.detail),
    });
  },

  // 提交问题
  submitProblemPlan() {
    if (lock) {
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
        projectId: Number(that.data.projectId),
        description: that.data.currentProblem,
        score: Number(that.data.currentScore),
        finalTime: that.data.date,
        imageList: imageList,
      }
      request.post(requestUrl.commitProblem, data)
        .then(res => {

          Toast.success('提交成功');
          that.setData({
            projectId: "",
            projectName: "",
            currentProblem: "",
            currentScore: "",
            date: "",
            files1: [],
          });
          // 释放锁
          lock = true
        }, err => {
          // 释放锁
          lock = true
          Toast.fail('提交失败，服务器错误');
        });
    }
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