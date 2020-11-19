var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
import Toast from '@vant/weapp/toast/toast';

Page({


  data: {
    effectReasonList:[],//影响原因集合
    activeNames: ['3'],
    projectId: '',//项目id
    categoryType: '',//项目类别
    projectName: '',  //工程名
    pmScheduleManageRecord: {},//合同工期
    scheduleManageMsgRecordList: [],//开工信息
    scheduleManageEffectRecordList: [],//影响工期
    hasRecord: false,
    showKgXxPopup: false,
    showYxgqPopup: false,
    kgDate: '',
    kgContent: '',
    costPoint: '',

    effectMsg:'',
    yxDate:''
  },


  onLoad: function (e) {
    var that = this;
    // 查询工期信息
    this.queryGqXx(e.projectId)
    that.setData({
      projectId: e.projectId,
      categoryType: e.categoryType,
      projectName: e.projectName
    })
  },


  queryGqXx(projectId) {
    let that = this
    request.get(requestUrl.GetGqXx + '/' + projectId).then(res => {
      if (res.data) {
        let scheduleManageMsgRecordList = res.data.scheduleManageMsgRecordList
        if (scheduleManageMsgRecordList && scheduleManageMsgRecordList.length > 0) {
          for (let i = 0; i < scheduleManageMsgRecordList.length; i++) {
            scheduleManageMsgRecordList[i].date = scheduleManageMsgRecordList[i].date.substring(0, 10)
          }
        }
        that.setData({
          pmScheduleManageRecord: res.data.pmScheduleManageRecord,
          scheduleManageMsgRecordList: res.data.scheduleManageMsgRecordList,
          scheduleManageEffectRecordList: res.data.scheduleManageEffectRecordList,
          effectReasonList: res.data.effectReasonList,
          hasRecord: true
        })
      } else {

      }
    })
  },
  inputContractDuration(e) {
    this.data.pmScheduleManageRecord.contractDuration = e.detail
  },
  inputContractCost(e) {
    this.data.pmScheduleManageRecord.contractCost = e.detail
  },
  // 提交工期信息
  submitGqXx() {
    let that = this
    if (!this.data.pmScheduleManageRecord.contractDuration) {
      Toast.fail("工期不能为空");
      return
    }
    if (!this.data.pmScheduleManageRecord.contractCost) {
      Toast.fail("造价不能为空");
      return
    }
    var requestBody = this.data.pmScheduleManageRecord
    requestBody.projectId = this.data.projectId
    request.post(requestUrl.SaveGqXx, requestBody).then(res => {
      Toast.success("保存成功");
      that.setData({
        hasRecord: true,
      })
    }, err => {
      Toast.fail(err.msg);
    })
  },

  showKgXxPopup() {
    this.setData({ showKgXxPopup: true });
  },
  closeKgXxPopup() {
    this.setData({ showKgXxPopup: false });
  },
  bindKgDateChange: function (e) {
    this.setData({
      kgDate: e.detail.value
    })
  },
  // 保存开工信息
  saveKgXx() {
    if (!this.data.kgDate) {
      Toast.fail("开工时间不能为空");
      return
    }
    if (!this.data.kgContent) {
      Toast.fail("开工内容不能为空");
      return
    }
    if (!this.data.costPoint) {
      Toast.fail("造价占比不能为空");
      return
    }
    let that = this
    request.post(requestUrl.SaveKgMsg, {
      content: that.data.kgContent,
      costPoint: that.data.costPoint,
      date: that.data.kgDate,
      projectId: that.data.projectId
    }).then(res => {
      res.data.date = res.data.date.substring(0, 10)
      that.data.scheduleManageMsgRecordList.push(res.data)
      that.setData({
        showKgXxPopup: false,
        scheduleManageMsgRecordList: that.data.scheduleManageMsgRecordList
      });
      Toast.success("保存成功");
    }, err => {
      Toast.fail(err.msg);
    })
  },



  showYxgqPopup(){
    this.setData({ showYxgqPopup: true });
  },
  closeYxgqPopup() {
    this.setData({ showYxgqPopup: false });
  },
  bindYxDateChange(e) {
    this.setData({ yxDate: e.detail.value })
  },
  bindYxMsgChange(e){
    let that = this;
    this.setData({ 
      effectMsg: that.data.effectReasonList[e.detail.value] 
    })
  },
  // 保存工期影响
  saveYxgq(){
    let that = this;
    if (!this.data.yxDate) {
      Toast.fail("影响时间不能为空");
      return
    }
    if (!this.data.effectMsg) {
      Toast.fail("影响原因不能为空");
      return
    }
    request.post(requestUrl.SaveYxgq, {
      effectMsg: that.data.effectMsg,
      date: that.data.yxDate,
      projectId: that.data.projectId
    }).then(res => {
      res.data.date = res.data.date.substring(0, 10)
      that.data.scheduleManageEffectRecordList.push(res.data)
      that.setData({
        showYxgqPopup: false,
        scheduleManageEffectRecordList: that.data.scheduleManageEffectRecordList
      });
      Toast.success("保存成功");
    }, err => {
      Toast.fail(err.msg);
    })

  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },


})