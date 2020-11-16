var dateTime = require('../../../../utils/getDateTime.js');
const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
var basePath = app.globalData.imageRootPath;
// var basePath = app.globalData.basePath;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 质量检查问题id
    finalTime: '',
    problem: {}, // 质量检查提问
    answerList: [], //质量检查列表
    hasPicture1: 0,
    picUrls1: [],
    files1: [],
    show1 : true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      id: options.id
    });
    request.get(requestUrl.getQualityById, {'id':that.data.id}).then(res => {
      if(res.code == 200) {
        console.log(res)
        that.setData({
          problem: res.data,
          answerList: res.data.answerList,
          finalTime: dateTime.getymd(new Date(res.data.finalTime), '-'),
        })
      }
    }).catch(
      
    );
  },

  //选择图片
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
//上传图片
upload1: function(res) {
  var that = this;
  console.log(res.tempFilePaths);
    const uploadTask = wx.uploadFile({
      url: basePath + '/api/control/zljc/upload/fileUpload?dir=image',
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
  // 输入回复
  inputAnswer: function(e){
    var that = this
    that.setData({
      reply: e.detail,
    })
  },

  // 提交回复
  commitAnswerQuality: function () {
    var that = this
    let data = {
      pmQualityCheckId: this.data.id,
      reply: this.data.reply,
      imageList: this.data.imageList
    }
    request.post(requestUrl.commitAnswerQuality, data).then(res => {
      console.log(res.data)
      if (res.code == 200) {
        Toast.success("提交成功")
        // 置空数据
        that.setData({
          reply: '',
          files1: []
        })
      } else if(res.code == 500){
        Toast.fail(res.msg);
      } else {
        Toast.fail('提交失败，服务器错误');
      }
    }).catch(err => { });
  },
})