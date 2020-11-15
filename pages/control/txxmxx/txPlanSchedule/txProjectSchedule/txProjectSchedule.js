var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
var dateTime = require('../../../../../utils/getDateTime.js');
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,//tabbar索引
    showOther: false,
    activeName: '',//切换折叠面板
    showUpLoadLoading:false,//展示上传中提示
    showLoadLoading: true,//加载页面提示
    showTab: -1,
    showCollapse: -1,//帮助展开一个折叠面板的时候disabled其他面板
    showCollapseHelp: false,//帮助展开一个折叠面板的时候disabled其他面板
    timeNode: [],//时间节点
    scheduleList: [],//计划信息集合，用来提交到后台保存数据
    newInputNum: 1,//新增输入框数量
    scheduleInfoMap:{},//所有已填的计划信息
    projectId: '',
    categoryType: '',
    startTime:'',
    endTime:'',
    projectName: '',
    roleRealId:'',
    scheduleShow: false,
    showSchedulePopup: false
  },

  onLoad: function(e){
    var that = this;
    that.setData({
      roleRealId: app.globalData.userInfo.roleRealId,
      projectId: e.projectId,
      categoryType: e.categoryType,
      projectName: e.projectName
    });
    if(that.data.roleRealId==8){
      that.setData({
        scheduleShow: true
      })
    }
    that.getTimeNode();
  },

  //失去焦点触发，比切换折叠面板先一步触发
  percentageBlur(e){
    var b = true;
    var scheduleMap = {};
    scheduleMap.id = e.currentTarget.dataset.id;
    scheduleMap.stepName = e.currentTarget.dataset.step_name;
    scheduleMap.nodeName = e.currentTarget.dataset.node_name;
    scheduleMap.tag = e.currentTarget.dataset.tag;
    scheduleMap.percentage = e.detail.value;
    if(scheduleMap.percentage!=='' && isNaN(Number(scheduleMap.percentage))){
      Toast.fail(scheduleMap.nodeName+"：请填数字");
      return;
    }

    //判断该项是否已存在于scheduleList内
    for(var item of this.data.scheduleList){
      if(item.tag === scheduleMap.tag){
        if(item.tag === "zt" && scheduleMap.nodeName === item.nodeName){
          //主体工程已存在
          item.id = scheduleMap.id;
          item.percentage = scheduleMap.percentage;
          b = false;
          break;
        }
        if(item.tag !== "zt"){
          //其他工程已存在
          item.id = scheduleMap.id;
          item.percentage = scheduleMap.percentage;
          b = false;
          break;
        }
      }
    }
    // 如果是新数据，直接添加
    if(b){
      this.data.scheduleList.push(scheduleMap);
    }
  },

  //切换折叠面板
  collapseChange(e) {
    var that = this;
    
    //if内去后台拉取数据，else内向后台提交数据
    if(typeof(e.detail)=="number"){
      //使用e.detail的值作为索引去timeNode集合中获取时间节点
      that.setData({
        startTime: that.data.timeNode[e.detail].startTime,
        endTime: that.data.timeNode[e.detail].endTime
      })
      
      that.setData({
        showCollapseHelp: true
      });
      // 获取到计划信息map
      request.post(requestUrl.getScheduleInfoMap, {startTime:that.data.startTime,projectId:that.data.projectId,categoryType:that.data.categoryType}).then(res => {
        that.setData({
          scheduleInfoMap: res.data
        })
      }).catch(err => {})
    }else{

      that.setData({
        showCollapseHelp: false
      });
      if(that.data.scheduleList.length > 0){
        that.setData({
          showUpLoadLoading: true
        });
        //提交计划信息
        request.post(requestUrl.insertScheduleList, {startTime:that.data.startTime,endTime:that.data.endTime,scheduleList:that.data.scheduleList,projectId:that.data.projectId}).then(res => {
          that.setData({
            scheduleList: [],
            showUpLoadLoading: false
          })
        }).catch(err => {
          that.setData({
            scheduleList: [],
            showUpLoadLoading: false
          })
        })
      }  
    }
    that.setData({
      activeName: e.detail,
      showTab: e.detail,
      showCollapse: e.detail
    });
  },

  //计划进度时间填写节点
  getTimeNode: function(e){
    var that = this;
    request.post(requestUrl.getTimeNode, {}).then(res => {
      let timeNode = res.data;
      var now = new Date(dateTime.getymd(new Date(), '-'));
      // var now = new Date("2021-12-09");
      var min = new Date(timeNode[0].startTime);
      var max = new Date(timeNode[timeNode.length-1].endTime);

      if(now <= min || now >= max){
        timeNode={};
      }else{
        for (let index = 0; index < timeNode.length; index++) {
          const endTime = new Date(timeNode[index].endTime);
          const startTime = new Date(timeNode[index].startTime);
          if(now <= endTime && now >= startTime){
            timeNode.splice(index+1, timeNode.length-index-1);
            break;
          }
        }
      }

      that.setData({
        timeNode: timeNode,
        showLoadLoading: false
      });
    }).catch(err => {
      that.setData({
        showLoadLoading: false
      })
    })
  },

  tabbarChange: function (e) {
    var that = this;
    that.setData({
      active: e.detail,
      showOther: !that.data.showOther
    })
  },

  // 添加进度
  addSchedule: function(e){
    
  }
})