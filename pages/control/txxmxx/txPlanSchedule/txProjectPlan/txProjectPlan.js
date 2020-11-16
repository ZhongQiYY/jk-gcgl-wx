var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '',//切换折叠面板
    showUpLoadLoading:false,//展示上传中提示
    showLoadLoading: true,//加载页面提示
    showTab: -1,
    showCollapse: -1,//帮助展开一个折叠面板的时候disabled其他面板
    showCollapseHelp: false,//帮助展开一个折叠面板的时候disabled其他面板
    timeNode: [],//时间节点
    planList: [],//计划信息集合，用来提交到后台保存数据
    newInputNum: 1,//新增输入框数量
    planInfoMap:{},//所有已填的计划信息
    projectId: '',
    categoryType: '',
    startTime:'',
    endTime:'',
    projectName: '',
    roleRealId: '',
    planShow: false
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
        planShow: true
      })
    }
    that.getTimeNode();
  },

  //失去焦点触发，比切换折叠面板先一步触发
  percentageBlur(e){
    var b = true;
    var planMap = {};
    planMap.id = e.currentTarget.dataset.id;
    planMap.stepName = e.currentTarget.dataset.step_name;
    planMap.nodeName = e.currentTarget.dataset.node_name;
    planMap.tag = e.currentTarget.dataset.tag;
    planMap.percentage = e.detail.value;
    if(planMap.percentage!=='' && isNaN(Number(planMap.percentage))){
      Toast.fail(planMap.nodeName+"：百分比请填数字");
      return;
    }
    if(0>Number(planMap.percentage) || Number(planMap.percentage)>100){
      Toast.fail(planMap.nodeName+"：百分比值太大");
      return;
    }

    //判断该项是否已存在于planList内
    for(var item of this.data.planList){
      if(item.tag === planMap.tag){
        if(item.tag === "zt" && planMap.nodeName === item.nodeName){
          //主体工程已存在
          item.id = planMap.id;
          item.percentage = planMap.percentage;
          b = false;
          break;
        }
        if(item.tag !== "zt"){
          //其他工程已存在
          item.id = planMap.id;
          item.percentage = planMap.percentage;
          b = false;
          break;
        }
      }
    }
    // 如果是新数据，直接添加
    if(b){
      this.data.planList.push(planMap);
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
      request.post(requestUrl.getPlanInfoMap, {startTime:that.data.startTime,projectId:that.data.projectId,categoryType:that.data.categoryType}).then(res => {
        that.setData({
          planInfoMap: res.data
        })
      }).catch(err => {})
    }else{

      that.setData({
        showCollapseHelp: false
      });
      if(that.data.planList.length > 0){
        that.setData({
          showUpLoadLoading: true
        });
        //提交计划信息
        request.post(requestUrl.insertPlanList, {startTime:that.data.startTime,endTime:that.data.endTime,planList:that.data.planList,projectId:that.data.projectId}).then(res => {
          that.setData({
            planList: [],
            showUpLoadLoading: false
          })
        }).catch(err => {
          that.setData({
            planList: [],
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
      that.setData({
        timeNode: res.data.timeNode,
        showLoadLoading: false
      });
    }).catch(err => {
      that.setData({
        showLoadLoading: false
      })
    })
  }
})