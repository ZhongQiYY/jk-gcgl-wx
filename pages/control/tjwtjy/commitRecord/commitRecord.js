// pages/control/tjwtjy/commitRecord/commitRecord.js
const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
import Toast from '@vant/weapp/toast/toast';
Page({

  data: {
    activeNames: ['1'],//折叠面板开关
    problemPlanCommitList:[],
  },


  onShow: function () {
    var that = this;
    Toast.loading({ duration:10000,forbidClick:true,message:'加载中',mask:true,zIndex:10000 });
    request.get(requestUrl.getCommitProblemPlanRecord).then(res => {
      that.setData({
        problemPlanCommitList:res.data
      });
      Toast.clear();
    },err=>{ 
      Toast.fail(err.msg); 
      Toast.clear();
    })
  },


  collapseChange: function(e){
    this.setData({
      activeNames: e.detail,
    });
  },

})