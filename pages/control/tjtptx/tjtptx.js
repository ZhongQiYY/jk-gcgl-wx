// pages/control/tjtptx/tjtptx.js
const app = getApp()
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
// var basePath = app.globalData.imageRootPath;
var basePath = app.globalData.basePath;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectNames: [], //@@
    projectId: "", //@@
    categoryType: "", //@@
    projectName: "", //@@

    hasPicture1: 0,
    picUrls1: [],
    files1: [],
    show1: true,

    hasPicture2: 0,
    picUrls2: [],
    files2: [],
    show2: true,
  },
  //搜索框组件返回的方法 @@
  inputTyping: function (e) {
    var inputVal = e.detail.inputVal;
    var nameList = app.globalData.projectNameList;
    var projectNames1 = [];
    for (const nl of nameList) {
      var projectName = nl.projectName;
      if (projectName.indexOf(inputVal) != -1) {
        projectNames1.push(nl);
      }
    }
    this.setData({
      projectNames: projectNames1
    })
  },
  //搜索框组件返回的方法 @@
  selectProject: function (e) {
    app.globalData.pId = e.detail.projectId,
      this.setData({
        projectId: e.detail.projectId,
        categoryType: e.detail.categoryType,
        projectName: e.detail.projectName
      });
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

  //选择图片
  chooseImage1: function (e) {
    var that = this;
    if (that.data.projectId != 0 && that.data.categoryType != 0) {
      if (this.data.files1.length > 1) {
        app.showToast('一次性最多只能上传1张图片');
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
          if (files1.length == 1) {
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
    } else {
      Toast.fail("未选择项目");
    }
  },
  //上传图片
  upload1: function (res) {
    var that = this;
    console.log(res.tempFilePaths);
    const uploadTask = wx.uploadFile({
      url: basePath + '/api/control/tptx/upload/fileUpload?dir=image',
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
    var nowList1 = []; //新数据
    var uploaderList1 = this.data.files1; //原数据
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
  // 提交俯视图图片
  submit1() {
    var that = this
    if (that.data.projectId != 0 && that.data.categoryType != 0) {
      console.log(that.data)
      var data = {
        projectId: Number(that.data.projectId),
        projectName: that.data.projectName,
        fstImgUrl: that.data.picUrls1[0],
      }
      request.post(requestUrl.commitFst, data)
        .then(res => {
          if (res.code == 200) {
            Toast.success('提交成功');
            that.setData({
              projectId: "",
              projectName: "",
              files1: [],
            });
          } else {
            that.setData({
              projectId: "",
              projectNames: "",
              files1: [],
            });
            Toast.fail('提交失败，服务器错误');
          }
        })
        .catch(err => {})
    } else {
      Toast.fail("未选择项目");
    }
  },

   //选择图片2
   chooseImage2: function (e) {
    var that = this;
    if (that.data.projectId != 0 && that.data.categoryType != 0) {
      if (this.data.files2.length > 1) {
        app.showToast('一次性最多只能上传1张图片');
        return false;
      }
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let files2 = that.data.files2.concat(res.tempFilePaths);
          if (files2.length == 1) {
            that.setData({
              show2: false
            })
          }
          that.setData({
            files2: files2,
            hasPicture2: files2.length,
          })
          that.upload2(res);
        }
      });
    } else {
      Toast.fail("未选择项目");
    }
  },
  //上传图片
  upload2: function (res) {
    var that = this;
    console.log(res.tempFilePaths);
    const uploadTask = wx.uploadFile({
      url: basePath + '/api/control/tptx/upload/fileUpload?dir=image',
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
          that.data.picUrls2.push(url);
          that.setData({
            hasPicture2: that.data.files2.length,
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
  clearImg2: function (e) {
    var nowList2 = []; //新数据
    var uploaderList2 = this.data.files2; //原数据
    for (let i = 0; i < uploaderList2.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList2.push(uploaderList2[i])
      }
    }
    this.setData({
      hasPicture2: this.data.hasPicture2 - 1,
      files2: nowList2,
      show2: true
    })
  },
  //展示图片
  previewImage2: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.files2,
      current: that.data.files2[e.currentTarget.dataset.index]
    })
  },
  // 提交俯视图图片
  submit2() {
    var that = this
    if (that.data.projectId != 0 && that.data.categoryType != 0) {
      console.log(that.data)
      var data = {
        projectId: Number(that.data.projectId),
        projectName: that.data.projectName,
        nbtstImgUrl: that.data.picUrls2[0],
      }
      request.post(requestUrl.commitNbtst, data)
        .then(res => {
          if (res.code == 200) {
            Toast.success('提交成功');
            that.setData({
              projectId: "",
              projectName: "",
              files2: [],
            });
          } else {
            that.setData({
              projectId: "",
              projectNames: "",
              files2: [],
            });
            Toast.fail('提交失败，服务器错误');
          }
        })
        .catch(err => {})
    } else {
      Toast.fail("未选择项目");
    }
  },
})