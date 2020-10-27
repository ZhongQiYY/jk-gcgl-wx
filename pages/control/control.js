// pages/control/control.js
const app = getApp();
var basePath = app.globalData.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveNameList: false,
    notShowLimit: false,
    projectName: "",
    projectNames: [], //@@
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
    app.globalData.pName = e.detail.projectName;
    app.globalData.pId = e.detail.projectId;
    app.globalData.cType = e.detail.categoryType;
    this.setData({
      projectName: e.detail.projectName
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if(app.globalData.hasUserInfo && app.globalData.userInfo.state == 1){
        this.setData({
          notShowLimit: true
        });
    }else{
      that.setData({
        notShowLimit: false
      })
    }
    var list = app.globalData.projectNameList;
    if(list.length <= 0 && !that.data.haveNameList && app.globalData.hasUserInfo && app.globalData.userInfo.state == 1){
      wx.request({
        url: basePath+"/api/project/nameList", //请求路径
        method: 'post',
        data: {
          
        },
        header: {
          'content-type': 'application/json', // 默认值
          'thirdSession': app.globalData.thirdSession
        },
        success (res) {
          app.globalData.projectNameList = res.data  
          that.setData({
            haveNameList: true
          })
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  toJdxx: function () {
    wx.navigateTo({
      url: '/pages/control/txjdxx/txjdxx',
    })
  },
  toAqjc: function () {
    wx.navigateTo({
      url: '/pages/control/tjaqjc/tjaqjc',
    })
  },
  toZljc: function () {
    wx.navigateTo({
      url: '/pages/control/tjzljc/tjzljc',
    })
  },
  toDbsx: function () {
    wx.navigateTo({
      url: '/pages/control/tjdbsx/tjdbsx',
    })
  },
  toQzsp: function () {
    wx.navigateTo({
      url: '/pages/control/tjqzsp/tjqzsp',
    })
  },
  toHtgl: function () {
    wx.navigateTo({
      url: '/pages/control/tjhtgl/tjhtgl',
    })
  },
  toTzwj: function () {
    wx.navigateTo({
      url: '/pages/control/tjtzwj/tjtzwj',
    })
  },
  toTptx: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/tjtptx',
    })
  },
  toWtjy: function () {
    wx.navigateTo({
      url: '/pages/control/tjwtjy/tjwtjy',
    })
  },
  toSjbsc: function () {
    wx.navigateTo({
      url: '/pages/control/sjbsc/sjbsc',
    })
  },
})