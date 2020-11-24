// pages/control/tjwtjy/wtjyDetail/wtjyDetail.js
const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: 1,//状态
    problemPlanInfo: {},//展示的信息
  },

  onLoad: function (e) {

    this.setData({
      problemPlanInfo: e
    })
  },

  deleteRecord() {
    let that = this;
    Dialog.confirm({
      message: '是否撤回',
      asyncClose: true
    }).then(() => {
      request.del(requestUrl.deleteWtjyRecord + "?id=" + that.data.problemPlanInfo.id).then(res => {
        wx.navigateBack({
          url: '/pages/control/tjwtjy/commitRecord/commitRecord',
        })
        that.setData({ problemPlanInfo: {} })
        Toast.success("删除成功");
      }, err => {
        Toast.fail(err.msg);
      });
      Dialog.close();
    })
    .catch(() => {
      Dialog.close();
    });
    
    
  }

})