var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  
  data: {
    activeNames: ['1', '2', '3'],
    projectId: '',//项目id
    categoryType: '',//项目类别
    projectName: '',  //工程名
    pmScheduleManageRecord: {},
    scheduleManageMsgRecordList: [],
    hasRecord: false,
    showKgXxPopup: false,
    kgDate: '',
    kgContent:'',
    costPoint: '',
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

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  queryGqXx(projectId) {
    let that = this
    request.get(requestUrl.GetGqXx + '/' + projectId).then(res => {
      console.log(res)
      if (res.data) {
        let scheduleManageMsgRecordList = res.data.scheduleManageMsgRecordList
        if (scheduleManageMsgRecordList && scheduleManageMsgRecordList.length > 0) {
          for(let i =0;i<scheduleManageMsgRecordList.length;i++) {
            scheduleManageMsgRecordList[i].date = scheduleManageMsgRecordList[i].date.substring(0, 10)
          }
        }
        that.setData({
          pmScheduleManageRecord: res.data.pmScheduleManageRecord,
          scheduleManageMsgRecordList: res.data.scheduleManageMsgRecordList,
          hasRecord: true
        })
      } else {

      }
    }).catch(err => {
      
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
      wx.showToast({
        icon: 'none',
        title: '工期不能为空',
      })
      return
    }
    if (!this.data.pmScheduleManageRecord.contractCost) {
      wx.showToast({
        icon: 'none',
        title: '造价不能为空',
      })
      return
    }
    var requestBody = this.data.pmScheduleManageRecord
    requestBody.projectId = this.data.projectId
    console.log(requestBody)
    request.post(requestUrl.SaveGqXx, requestBody).then(res => {
      console.log(res)
      if (res.code == 200) {
        wx.showToast({
          icon: 'success',
          title: '保存成功',
        })
        that.setData({
          hasRecord: true,
        })
      }else {
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
    }).catch(err => {
      
    })
  },
  showKgXxPopup() {
    this.setData({ showKgXxPopup: true });
  },
  closeKgXxPopup() {
    this.setData({ showKgXxPopup: false });
  },
  bindKgDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      kgDate: e.detail.value
    })
  },
  // 保存开工信息
  saveKgXx() {
    // kgDate: '',
    // kgContent:'',
    // costPoint: '',
    console.log(this.data.kgDate)
    console.log(this.data.kgContent)
    console.log(this.data.costPoint)
    if (!this.data.kgDate) {
      wx.showToast({
        icon: 'none',
        title: '开工时间不能为空',
      })
      return
    }
    if (!this.data.kgContent) {
      wx.showToast({
        icon: 'none',
        title: '开工内容不能为空',
      })
      return
    }
    if (!this.data.costPoint) {
      wx.showToast({
        icon: 'none',
        title: '造价点比不能为空',
      })
      return
    }
    let that = this
    request.post(requestUrl.SaveKgMsg, {
      content: this.data.kgContent,
      costPoint: this.data.costPoint,
      date: this.data.kgDate,
      projectId: this.data.projectId

    } ).then(res => {
      if (res.code == 200) {
        res.data.date = res.data.date.substring(0,10)
        that.data.scheduleManageMsgRecordList.push(res.data)
        that.setData({
          showKgXxPopup: false,
          scheduleManageMsgRecordList: that.data.scheduleManageMsgRecordList
        })
        wx.showToast({
          icon: 'success',
          title: '保存成功',
        })
      }
    }).catch(err => {
      
    })
  },
   deleteKgXx(e) {
     console.log(e)
     let index = e.currentTarget.id

     let that = this
    request.post(requestUrl.DeleteKgMsg + '/' +this.data.scheduleManageMsgRecordList[index].id).then(res => {
      if (res.code == 200) {
        that.data.scheduleManageMsgRecordList.splice(index, 1)
        that.setData({
          scheduleManageMsgRecordList: that.data.scheduleManageMsgRecordList
        })
        wx.showToast({
          title: '删除成功',
        })
      }
    }).catch(err => {
      
    })
   }
  
})