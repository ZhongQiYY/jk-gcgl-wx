// pages/self/info/info.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    name: '',
    company: '',
    companies: [],
    roleId: app.globalData.userInfo.roleId,
    role: app.globalData.userInfo.role,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo,
      name: app.globalData.userInfo.name,
      company: app.globalData.userInfo.company,
      companies: app.globalData.companies,
      roleId: app.globalData.userInfo.roleId,
      role: app.globalData.userInfo.role,
    });
    console.log(this.data.userInfo);
    console.log("zxczxc")
    console.log(this.data)
    console.log(app.globalData.companies);
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
          name: this.data.name,
          company: this.data.company.name,
          roleId: this.data.roleId,
          role: this.data.role,
        },

        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'thirdSession': app.globalData.thirdSession
        },
        success(res) {
          console.log(page.data.company.name+"MM")
          console.log(page.data.userInfo)
          wx.hideLoading();
          if (res.statusCode == 200) {
            if (res.data.code == 200) {
              page.data.userInfo.name = page.data.name;
              page.data.userInfo.company = page.data.company.name;
              page.data.userInfo.roleId = page.data.roleId;
              page.data.userInfo.role = page.data.role;
              app.globalData.userInfo = page.data.userInfo;
              console.log(app.globalData.userInfo);
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
  bindPositionChange: function(e) {
    this.setData({
      roleId: this.data.userInfo.roles[e.detail.value].id,
      role: this.data.userInfo.roles[e.detail.value].name
    });
  },
  bindCompanyChange: function(e) {
    console.log(e.detail)
    console.log(e+"AA")
    console.log(this.data.companies[e.detail.value])
    let company = this.data.companies[e.detail.value];
    this.data.userInfo.company = company.name;
    console.log(this.data.userInfo.company)
    this.setData({
      company: company
    });
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  checkInput: function () {
    console.log(this.data.company)
    if (this.data.company == '' || this.data.company == '') {
      app.showToast('请选择公司');
      return false;
    }
    if (this.data.name == '') {
      app.showToast('请输入姓名');
      return false;
    }
    return true;
  }
})