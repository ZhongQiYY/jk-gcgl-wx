// pages/self/info/info.js
const app = getApp()
var basePath = app.globalData.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companies: [],
    roles: [],
    stateText: '',
    company: '',
    role: '',
    name: '',
    roleId: ''
  },

  // 职位选中触发
  bindPositionChange: function (e) {
    this.setData({
      roleId: this.data.roles[e.detail.value].id,
      role: this.data.roles[e.detail.value].name
    });
  },

  // 公司选中触发
  bindCompanyChange: function (e) {
    this.setData({
      company: this.data.companies[e.detail.value].name
    });
  },

  //提交信息
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
          name: page.data.name,
          company: page.data.company,
          roleId: page.data.roleId,
          role: page.data.role,
        },

        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'thirdSession': app.globalData.thirdSession
        },
        success(res) {
          console.log(page.data.company + "MM")
          wx.hideLoading();
          if (res.statusCode == 200) {
            if (res.data.code == 200) {
              app.globalData.userInfo = res.data.data;
              wx.navigateBack({
                delta: 1
              })
            } else if (res.data.code == 201) {
              page.data.stateText = res.data.msg;
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

  // 
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  //检查输入
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
  },

  onShow: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      company: app.globalData.userInfo.company,
      role: app.globalData.userInfo.role,
      name: app.globalData.userInfo.name,
      roleId: app.globalData.userInfo.roleId
    });
    // 查询公司与角色集合
    wx.request({
      url: basePath+'/api/wechat/companiesAndRoles',
      method: 'POST',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        if(res.data.code == 200){
          that.setData({
            companies: res.data.data.companies,
            roles: res.data.data.roles,
            stateText: res.data.data.stateText
          })
        }
      },
      fail(res) {
        app.showToast('服务器繁忙，请稍后再试\n' + '(状态码:500)');
      }
    })
  }

})