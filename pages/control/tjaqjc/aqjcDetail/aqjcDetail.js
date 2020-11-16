var dateTime = require('../../../../utils/getDateTime.js');
const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 安全检查问题id
    finalTime: '',
    problem: {}, // 安全检查提问
    reply: '', // 整改回复
    imageList: [], // 回复图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      id: options.id
    });
    request.get(requestUrl.getProblemById, { 'id': that.data.id }).then(res => {
      if (res.code == 200) {
        console.log(res)
        that.setData({
          problem: res.data,
          finalTime: dateTime.getymd(new Date(res.data.finalTime), '-')
        })
      }
    }).catch(

    );
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

  // 输入回复
  inputAnswer: function(e){
    var that = this
    console.log(e)
    that.setData({
      reply: e.detail,
    })
  },

  // 提交回复
  commitAnswer: function () {
    var that = this
    let data = {
      pmSafeCheckId: this.data.id,
      reply: this.data.reply,
      imageList: this.data.imageList
    }
    request.post(requestUrl.commitAnswer, data).then(res => {
      if (res.code == 200) {
        Toast.success("提交成功")
        // 置空数据
        that.setData({
          reply: '',
          imageList: []
        })
      } else if(res.code == 500){
        Toast.fail(res.msg);
      } else {
        Toast.fail('提交失败，服务器错误');
      }
    }).catch(err => { });
  },

})