const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
var basePath = app.globalData.basePath;
// var basePath = app.globalData.imageRootPath;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 签证审批id
    visaApprove: {}, // 签证审批对象
    show: false, //是否展示同意拒绝按钮
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
    request.get(requestUrl.getProblemById, { 'id': that.data.id }).then(res => {
      if (res.code == 200) {
        console.log(res)
        that.setData({
          problem: res.data,
          answerList: res.data.answerList,
          finalTime: dateTime.getymd(new Date(res.data.finalTime), '-')
        })
      }
    }, err => {});
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})