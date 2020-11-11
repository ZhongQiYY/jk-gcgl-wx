const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
var roleRealId;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBuildUnit: false,//建设单位操作
    showZongGongBan: false,//总工办操作
    showDuChaBu: false,//督察部操作
    showCost: false,//财务部
    allRedDotNum: {},
    haveNameList: false,
    notShowLimit: false,
    roleRealId: '',
  },

  onShow: function () {
    var that = this;
    if(app.globalData.hasUserInfo && app.globalData.userInfo.state == 1){
      if(!that.data.notShowLimit){
        roleRealId = app.globalData.userInfo.roleRealId;
        this.setData({
          notShowLimit: true,
          roleRealId: app.globalData.userInfo.roleRealId
        });
        if(roleRealId==11){
          that.setData({
            showCost: true
          });
        }
        if(roleRealId==10 || roleRealId==6 || roleRealId==2 || roleRealId==1){
          that.setData({
            showBuildUnit: true
          });
        }
        if(roleRealId==10 || roleRealId==9 || roleRealId==3){
          that.setData({
            showZongGongBan: true
          })
        }
        if(roleRealId==10 || roleRealId==7 || roleRealId==4){
          that.setData({
            showDuChaBu: true
          })
        }
      }
    }else{
      that.setData({
        notShowLimit: false
      })
    }
    var list = app.globalData.projectNameList;
    if(list.length <= 0 && !that.data.haveNameList && app.globalData.hasUserInfo && app.globalData.userInfo.state == 1){
      request.post(requestUrl.nameList, {}).then(res => {
        app.globalData.projectNameList = res.data.projectNameList;
        app.globalData.projectNameListByCategory = res.data.projectNameListByCategory;  
        that.setData({
          haveNameList: true
        })
      }).catch(err => {})
    }
    // 获取所有红点数
    that.getAllRedDotNum();
  },

  // 获取所有红点数
  getAllRedDotNum: function(){
    var that = this;
    request.post(requestUrl.getAllRedDotNum, {}).then(res => {
      that.setData({
        allRedDotNum: res.data
      })
    }).catch(err => {})
  },

  // 建设单位
  toHtgl: function () {
    if(roleRealId==10 || roleRealId==2){
      wx.navigateTo({
        url: '/pages/control/tjhtgl/tjhtgl',
      })
    }else Toast.fail('无权限');
  },
  toTzwj: function () {
    if(roleRealId==10 || roleRealId==2){
      wx.navigateTo({
        url: '/pages/control/tjtzwj/tjtzwj',
      })
    }else Toast.fail('无权限');
  },
  toZjxx: function () {
    if(roleRealId==10 || roleRealId==2){
      wx.navigateTo({
        url: '/pages/control/tjzjxx/tjzjxx',
      })
    }else Toast.fail('无权限');
  },
  toQzsp: function () {
    if(roleRealId==10 || roleRealId==1){
      wx.navigateTo({
        url: '/pages/control/tjqzsp/tjqzsp',
      })
    }else Toast.fail('无权限');
  },
  toWtjy: function () {
    if(roleRealId==10 || roleRealId==1){
      wx.navigateTo({
        url: '/pages/control/tjwtjy/tjwtjy',
      })
    }else Toast.fail('无权限');
  },
  toXmxx: function () {
    if(roleRealId==10 || roleRealId==1){
      wx.navigateTo({
        url: '/pages/control/txxmxx/txxmxx',
      })
    }else Toast.fail('无权限');
  },

  // 总工办
  toAqjc: function () {
    wx.navigateTo({
      url: '/pages/control/tjaqjc/tjaqjc',
    })
  },
  toTptx: function () {
    wx.navigateTo({
      url: '/pages/control/tjtptx/tjtptx',
    })
  },

  // 督察部
  toZljc: function () {
    wx.navigateTo({
      url: '/pages/control/tjzljc/tjzljc',
    })
  },

  
  toSjbsc: function () {
    wx.navigateTo({
      url: '/pages/control/sjbsc/sjbsc',
    })
  },
  
})