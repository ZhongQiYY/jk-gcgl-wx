// pages/tableData/datapages/ydxx/ydxx.js
const app = getApp();
var basePath = app.globalData.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ydxxList: [],
    notShowDialogYear: true,//是否展示弹出层
    selectValueYear: "",//页面上显示的年份
    radioItemsYear: [],//传入子组件的年份信息
    
    notShowDialogMonth: true,//是否展示弹出层
    selectValueMonth: "",//页面上显示的月份
    //传入子组件的月份信息
    radioItemsMonth: [
      { selectValue: "1月", selectContent: "1月" },
      { selectValue: "2月", selectContent: "2月" },
      { selectValue: "3月", selectContent: "3月" },
      { selectValue: "4月", selectContent: "4月" },
      { selectValue: "5月", selectContent: "5月" },
      { selectValue: "6月", selectContent: "6月" },
      { selectValue: "7月", selectContent: "7月" },
      { selectValue: "8月", selectContent: "8月" },
      { selectValue: "9月", selectContent: "9月" },
      { selectValue: "10月", selectContent: "10月" },
      { selectValue: "11月", selectContent: "11月" },
      { selectValue: "12月", selectContent: "12月" },
    ]
  },

  //月份选择
  selectMonth: function () {
    this.setData({
      notShowDialogMonth: false
    })
  },
  getSelectValueMonth: function (e) {
    var selectValue = e.detail.selectValue;
    var notShowDialog = e.detail.notShowDialog;
    this.setData({
      selectValueMonth: selectValue,
      notShowDialogMonth: notShowDialog
    })
  },
  closeDialogMonth: function (e) {
    var notShowDialog = e.detail.notShowDialog;
    this.setData({
      notShowDialogMonth: notShowDialog
    })
  },

  //年份选择
  selectYear: function () {
    this.setData({
      notShowDialogYear: false
    })
  },
  getSelectValueYear: function (e) {
    var selectValue = e.detail.selectValue;
    var notShowDialog = e.detail.notShowDialog;
    this.setData({
      selectValueYear: selectValue,
      notShowDialogYear: notShowDialog
    })
  },
  closeDialogYear: function (e) {
    var notShowDialog = e.detail.notShowDialog;
    this.setData({
      notShowDialogYear: notShowDialog
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //初始化年份与月份信息
    //获取当前日期  
    var Y = new Date().getFullYear();//获取年份 
    var M = new Date().getMonth()+1;//获取月份
    var radioItemsYear = [];
    var yearMap = {};
    var num = Y + 5
    for (let i = 0; i < 20; i++) {
      yearMap = {};
      yearMap["selectValue"] = (num - i)+"年";
      yearMap["selectContent"] = (num - i)+"年";
      radioItemsYear[i] = yearMap;
    }
    this.setData({
      selectValueYear: Y+"年",
      selectValueMonth: M+"月",
      radioItemsYear: radioItemsYear
    })

    wx.request({
      url: basePath + "/api/chartData/ydxx", //请求路径
      method: 'post',
      data: {
        projectId: app.globalData.projectId,
        categoryType: app.globalData.categoryType
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        that.setData({
          ydxxList: res.data
        });
      },
      fail() {
        
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})