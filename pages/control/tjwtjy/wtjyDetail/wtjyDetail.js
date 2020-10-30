// pages/control/tjwtjy/wtjyDetail/wtjyDetail.js
const app = getApp();
var basePath = app.globalData.basePath;
var dateTime = require('../../../../utils/getDateTime.js');
import Toast from '@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: 1,//状态
    problemPlanInfo: {},//展示的信息
    maxOpinionLength: 30,//最大输入批示长度
    opinion: "",//批示内容
  },

  // 输入批示
  inputOpinion:function(e){
    if (e.detail.length > this.data.maxOpinionLength) return;
    this.setData({
      opinion: e.detail
    });
  },

  // 点击已阅
  haveRead: function(){
    var that = this;
    //获取当前时间
    var replierTime = dateTime.getymdhms(new Date(), '-', ':');
    // 传入值为表添加批示内容，并更新状态为已阅
    wx.request({
      url: basePath + "/api/control/wtjy/updateOpinion", //请求路径
      method: 'post',
      data: {
        status: 2,
        id: that.data.problemPlanInfo.id,
        projectId: that.data.problemPlanInfo.projectId,
        opinion: that.data.opinion,
        replierTime: replierTime
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        if (res.data.code === 200) {
          that.setData({
            status: 2
          });
          Toast({
            type: 'success',
            message: '操作成功',
            duration: 1500
          });
        }else if(res.data.code === 500 && res.data.msg === "已阅"){
          Toast.fail('操作失败，该项已完成批示');
        }else if(res.data.code === 500 && res.data.msg === "未找到"){
          Toast.fail('未找到该数据，或已删除');
        }else Toast.fail('失败，服务器错误');
      }
    });
  },

  onLoad:function(e){
    this.setData({
      problemPlanInfo: e
    })
  },
  
})