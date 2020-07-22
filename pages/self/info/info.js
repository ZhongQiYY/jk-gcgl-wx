// pages/self/info/info.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo,
      name: app.globalData.userInfo.name,
    });
    console.log(this.data.userInfo);
  },

  saveInfo: function () {
    if (this.checkInput()) {
      const page = this;
      wx.showLoading({
        title: '保存中',
        mask: true
      });
      wx.request({
        url: app.globalData.url.userData,
        method: 'POST',
        data: {
          name: this.data.name
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'thirdSession': app.globalData.thirdSession
        },
        success(res) {
          wx.hideLoading();
          if (res.statusCode == 200) {
            if (res.data.code == 200) {
              page.data.userInfo.name = page.data.name;
              app.globalData.userInfo = page.data.userInfo;
              wx.navigateBack({
                delta: 1
              })
            } else if (res.data.code == 201) {
              page.data.userInfo.state = 1;
              page.data.userInfo.stateText = res.data.msg;
              app.globalData.userInfo = page.data.userInfo;
              page.setData({
                userInfo: app.globalData.userInfo
              });
              app.showToast(res.data.msg);
            } else {
              app.showToast('服务器繁忙，请稍后再试\n' + '(错误码:' + res.data.code + ')');
            }
          } else {
            app.showToast('服务器繁忙，请稍后再试\n' + '(状态码:' + res.statusCode + ')');
          }
        },
        fail(res) {
          app.showToast('服务器繁忙，请稍后再试\n' + '(状态码:500)');
        }
      })
    }
  },
  bindOrganChange: function (e) {
    this.setData({
      organId: this.data.userInfo.organs[e.detail.value].id,
      organ: this.data.userInfo.organs[e.detail.value].name
    });
  },
  bindPositionChange: function(e) {
    this.setData({
      roleId: this.data.userInfo.roles[e.detail.value].id,
      role: this.data.userInfo.roles[e.detail.value].name
    });
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  checkInput: function () {
    // if (this.data.organId == '' || this.data.organ == '') {
    //   app.showToast('请选择部门');
    //   return false;
    // }
    if (this.data.name == '') {
      app.showToast('请输入姓名');
      return false;
    }
    return true;
  }
})