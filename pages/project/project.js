var base64 = require("../../dist/example/images/base64");
var app = getApp();
var basePath = app.globalData.basePath;
Page({
  mixins: [require('../../dist/mixin/themeChanged')],

  data: {
    buildArray: ['--请选择--', '科技城', '满园', '西城', '综保区', '中恒工业', '中恒商业', '磊昇', '工建'],
    categoryArray: ['--请选择--', '返迁棚改', '工业厂房', '商业地产', '文教体卫', '公园绿化', '市政桥梁'],
    rootPath: app.globalData.imageRootPath,
    buildIndex: 0,
    categoryIndex: 0,
    projectList: [],
    search: "search",
    loadingHidden: false,
    hasUserInfo: false,
    errorInfo: true
  },

  // 选择建设单位
  bindBuildChange: function (e) {
    var that = this;
    this.setData({
      buildIndex: e.detail.value
    });
    wx.request({
      url: basePath + "/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: this.data.buildArray[e.detail.value],
        categoryId: this.data.categoryIndex
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        that.setData({
          projectList: res.data
        })
      }
    });
  },
  // 选择项目类别
  bindCategoryChange: function (e) {
    var that = this;
    this.setData({
      categoryIndex: e.detail.value
    });
    wx.request({
      url: basePath + "/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: this.data.buildArray[this.data.buildIndex],
        categoryId: this.data.categoryIndex
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        that.setData({
          projectList: res.data
        })
      }
    });
  },

  //显示项目详情
  showProjectInfo: function (e) {
    app.globalData.projectId = e.currentTarget.dataset.id;
    app.globalData.categoryType = e.currentTarget.dataset.categorytype;
    app.globalData.pName = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '/pages/project/projectInfo/projectInfo',
    })


  },

  //下拉触发
  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();
  },

  //--------------------------生命周期函数------------------------------
  onLoad: function (options) {
    var that = this;
    wx.stopPullDownRefresh();
    that.setData({
      hasUserInfo: app.globalData.hasUserInfo
    });

    app.userLogin(
      function () {
        that.setData({
          hasUserInfo: app.globalData.hasUserInfo
        });
        if (that.data.hasUserInfo) {
          that.setData({
            loadingHidden: false,
            errorInfo: true
          })
          wx.request({
            url: basePath + "/api/project/list", //请求路径
            method: 'post',
            data: {
              unitName: that.data.buildArray[that.data.buildIndex],
              categoryId: that.data.categoryIndex
            },
            header: {
              'content-type': 'application/json', // 默认值
              'thirdSession': app.globalData.thirdSession
            },
            success(res) {
              that.setData({
                projectList: res.data,
                loadingHidden: true,
                errorInfo: true
              });
            },
            fail() {
              that.setData({
                loadingHidden: false,
                errorInfo: true
              })
              setTimeout(function () {
                that.setData({
                  loadingHidden: true,
                  errorInfo: false
                })
              }, 10000);
            }
          });
        } else {
          that.setData({
            loadingHidden: false,
            errorInfo: true
          })
          setTimeout(function () {
            that.setData({
              loadingHidden: true,
              errorInfo: false
            })
          }, 10000);
        }
      },
      function () {
        that.setData({
          loadingHidden: false,
          errorInfo: true
        })
        setTimeout(function () {
          that.setData({
            loadingHidden: true,
            errorInfo: false
          })
        }, 10000);
      });

    this.setData({
      icon: base64.icon20
    });
  },

  onShow: function () {

  }
})