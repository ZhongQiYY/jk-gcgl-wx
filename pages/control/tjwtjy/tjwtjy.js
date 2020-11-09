// pages/control/tjwtjy/tjwtjy.js
const app = getApp();
var basePath = app.globalData.basePath;
var dateTime = require('../../../utils/getDateTime.js');
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxProblemLength: 500,//最大问题提交长度
    maxPlanLength: 500,//最大计划提交长度
    currentProblem: "",//当前输入的问题文字
    currentPlan: "",//当前输入的计划文字
    projectName:"",//项目名称
    
    active: 0,//tabbar索引
    showOther: true,//tabbar切换显示
    activeNames: ['1'],//折叠面板开关

    showSubmitTips: false,

    problemPlanCommitList:[],
  },
  //输入问题建议时
  inputProblem: function (e) {
    if (e.detail.length > this.data.maxProblemLength) return;
    this.setData({
      currentProblem: e.detail
    })
  },
  //输入下一步工作计划时
  inputPlan: function (e) {
    if (e.detail.length > this.data.maxPlanLength) return;
    this.setData({
      currentPlan: e.detail
    });
  },
  //提交问题和计划
  submitProblemPlan: function () {
    var that = this;
    var nolock = true;
    //获取当前时间
    var year = new Date().getFullYear();//获取年份 
    var month = new Date().getMonth() + 1;//获取月份
    var submitTime = dateTime.getymdhms(new Date(), '-', ':');

    if(app.globalData.pId == "" || app.globalData.pId == 0){
      Toast.fail('请选择项目');
    }else if(that.data.currentProblem == ""){
      Toast.fail('请描述存在的问题');
    }else if(that.data.currentPlan == ""){
      Toast.fail('请描述下一步工作计划');
    }else{
      if(nolock){
        that.setData({
          showSubmitTips: true
        })
        nolock = false;
        wx.request({
          url: basePath + "/api/control/wtjy/submitProblemPlan", //请求路径
          method: 'post',
          data: {
            status: 1,
            projectId: app.globalData.pId,
            existProblem: that.data.currentProblem,
            nextPlan: that.data.currentPlan,
            submitYear: year,
            submitMonth: month,
            submitTime: submitTime,
            projectName: that.data.projectName,
            unitName: app.globalData.userInfo.company
          },
          header: {
            'content-type': 'application/json', // 默认值
            'thirdSession': app.globalData.thirdSession
          },
          success(res) {
            if (res.data.code === 200) {
              Toast.success('提交成功');
              that.setData({
                showSubmitTips: false,
                currentProblem: "",
                currentPlan: "",
              });
              nolock = true;
            }else{
              that.setData({
                showSubmitTips: false,
              })
              Toast.fail('提交失败，服务器错误');
              nolock = true;
            }
          }
        });
      }
    }
  },


  // 提交记录
  submitRecord: function(e){
    wx.navigateTo({
      url: '/pages/control/tjwtjy/commitRecord/commitRecord',
    }) 
  },

  onShow: function () {
    var that = this;
    that.setData({
      projectName: app.globalData.pName
    })
  },

  onLoad: function(){
    var that = this;
    wx.request({
      url: basePath + "/api/control/wtjy/getProblemPlanCommit", //请求路径
      method: 'post',
      data: {
        
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        if (res.data.code === 200) {
          that.setData({
            problemPlanCommitList: res.data.data
          })
        }else{
          Toast.fail('失败，服务器错误');
        }
      }
    });
  },

  gotoDetail: function(e){
    e.currentTarget.dataset.id;
  },
  
  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail,
      showOther: !that.data.showOther
    });
    if(!that.data.showOther){
      that.onLoad();
    }
  },
  collapseChange: function(e){
    this.setData({
      activeNames: e.detail,
    });
  },
})