const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
// var basePath = app.globalData.imageRootPath;
var basePath = app.globalData.basePath;
import Toast from '@vant/weapp/toast/toast';
// 加锁，防止多次提交
var lock = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectNames: [], //@@
    projectName: '',//项目名称
    projectId: '',//项目id
    categoryType: '',//项目类别
    showOther: true,
    active: 0,//tabbar索引
    date: '',
    show: false,
    activeNames: ['1'],
    hasPicture1: 0,
    picUrls1: [],
    files1: [],
    show1: true,
    visaCode: '',
    actualizeSituation: '',
    surveyor: '',
    changeSite: '',
    changeReason: '',
    changeMoney: '',
    changeProperty: '',
    changeContent: '',
    problemPlanList: [
      {
        unitName: "综保区", projectName: "标准厂房三期", timeNameList: [
          { submitTime: "2020-09-27", commitName: "钟祺" },
          { submitTime: "2020-08-27", commitName: "刘杭" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-11-27", commitName: "高镪" },
          { submitTime: "2020-09-27", commitName: "缪隽峰" },
          { submitTime: "2020-12-27", commitName: "温龙飞" },
          { submitTime: "2020-11-27", commitName: "高镪" },
          { submitTime: "2020-06-27", commitName: "吴忠喜" },
          { submitTime: "2020-12-27", commitName: "温龙飞" },
        ]
      }
    ],
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
    that.setData({
      changeContent: e.detail
    })
  },

  submitVisa: function () {
    if (lock) {
      // 上锁
      lock = false

      if (this.data.projectId == '') {
        Toast.fail('请先选择项目');
      }
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
      request.post(requestUrl.saveVisaApprove, data)
        .then(res => {
          Toast.success('提交成功');
          that.setData({
            projectId: "",
            projectName: "",
            visaCode: "",
            actualizeSituation: "",
            surveyor: "",
            changeSite: "",
            changeReason: "",
            changeMoney: "",
            changeProperty: "",
            changeContent: "",
            files1: [],
          });
          // 释放锁
          lock = true
        }, err => {
          // 释放锁
          lock = true
          that.setData({
            projectId: "",
            projectNames: "",
            visaCode: "",
            actualizeSituation: "",
            surveyor: "",
            changeSite: "",
            changeReason: "",
            changeMoney: "",
            changeProperty: "",
            changeContent: "",
            files1: [],
          });
          Toast.fail('提交失败，服务器错误');
        });
    }

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

  onLoad: function (options) {

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
      url: basePath + '/api/control/visa/upload/fileUpload?dir=image',
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