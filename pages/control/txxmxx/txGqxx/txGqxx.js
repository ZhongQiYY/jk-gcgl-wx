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
    hasRecord: false,
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
        that.setData({
          pmScheduleManageRecord: res.data,
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
        that.setData({
          hasRecord: true
        })
        wx.showToast({
          icon: 'success',
          title: '保存成功',
        })
      }else {
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
    }).catch(err => {
      
    })
    
  }

  
})