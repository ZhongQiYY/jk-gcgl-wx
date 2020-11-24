// pages/control/tjwtjy/tjwtjy.js
const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxProblemLength: 500,//最大问题提交长度
    maxSolutionLength: 500,//最大计划提交长度

    existProblem: "",//存在问题
    solution: "",//解决措施
    department: "",//涉及部门
    timeLimit: "",//建议时限

    projectNames: [], //@@
    projectName:"",//项目名称
    projectId: '',//项目id
    categoryType: '',//项目类别
    lock:true
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

  bindDateChange: function (e) {
    this.setData({
      timeLimit: e.detail.value
    })
  },
  
  //提交问题建议
  submitProblemPlan: function () {
    var that = this;
    if(!that.data.projectId) { Toast.fail("请先选择项目"); return;}
    if(!that.data.existProblem) { Toast.fail("存在问题不能为空"); return;}
    if(!that.data.solution) { Toast.fail("解决措施不能为空"); return;}
    if(!that.data.department) { Toast.fail("涉及部门不能为空"); return;}
    if(!that.data.timeLimit) { Toast.fail("建议时限不能为空"); return;}
    
    if(that.data.lock){
      Toast.loading({ duration:10000,forbidClick:true,message:'保存中',mask:true,zIndex:10000 });
      that.setData({ lock:false })
      request.post(requestUrl.submitProblemPlan,{
        projectId: that.data.projectId,
        projectName: that.data.projectName,
        unitName: app.globalData.userInfo.company,
        existProblem: that.data.existProblem,
        solution: that.data.solution,
        department: that.data.department,
        timeLimit: that.data.timeLimit
      }).then(res => {
        that.setData({
          lock:true,
          existProblem: "",//存在问题
          solution: "",//解决措施
          department: "",//涉及部门
          timeLimit: "",//建议时限
        })
        Toast.success("保存成功");
      },err=>{
        that.setData({
          lock:true,
        });
        Toast.fail(err.msg);
      })
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
  },
  
  
})