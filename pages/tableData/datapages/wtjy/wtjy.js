var app = getApp();
var basePath = app.globalData.basePath;
const year = ['2019年', '2020年', '2021年'];
const month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPopup: false,
    active: 0,//tabbar索引
    showOther: true,
    processedInfo:[],//已处理
    unprocessedInfo:[],//未处理
    filterName: "全部",//过滤的名字
    projectName: "",
    pickerColumns: [
      {
        key: '年份',
        values: year,
        defaultIndex: 1,
      },
      {
        key: '月份',
        values: month,
        defaultIndex: 0,
      }
    ]
  },

  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail,
      showOther: !that.data.showOther
    });
    if(!that.data.showOther){
      
    }
  },

  onLoad: function(){
    var that = this;
    that.setData({
      projectName: app.globalData.projectName
    })
    that.getAllCommitInfoByProjectId();
  },

  getAllCommitInfoByProjectId: function(){
    var that = this;
    wx.request({
      url: basePath + "/api/control/wtjy/getAllCommitInfoByProjectId", //请求路径
      method: 'post',
      data: {
        projectId: app.globalData.projectId
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        if(res.data.code === 200){
          that.setData({
            processedInfo: res.data.data.processedInfo,
            unprocessedInfo: res.data.data.unprocessedInfo
          })
        }
      }
    });
  },

  //picker点击确认
  onConfirm: function(e){
    const {value, index } = e.detail;
    // 月份：index[1]+1
    // 年份：(value[0].split('年'))[0]

    
  },
  //picker点击取消
  onCancel: function(){
    this.setData({
      showPopup: false
    })
  },


  showPopup: function(){
    this.setData({
      showPopup: true
    })
  },
  popupClose: function(){
    this.setData({
      showPopup: false
    })
  }
    

})