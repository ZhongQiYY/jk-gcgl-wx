var base64 = require("../../dist/example/images/base64");
var app = getApp();
var basePath = app.globalData.basePath;
Page({
  mixins: [require('../../dist/mixin/themeChanged')],

  data: {
    buildArray: ['--请选择--','科技城', '满园', '西城', '综保区', '中恒工业', '中恒商业', '磊昇', '工建'],
    categoryArray: ['--请选择--','返迁棚改', '工业厂房', '商业地产', '文教体卫', '公园绿化', '市政桥梁'],
    rootPath: "https://test.xizinet.com",
    buildIndex: 0,
    categoryIndex: 0,
    projectList: [],
    search: "search",
    loadingHidden: false,
  },

  // 选择建设单位
  bindBuildChange: function(e) {  
    var that = this;
    this.setData({
      buildIndex: e.detail.value
    });
    wx.request({
      url: basePath+"/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: this.data.buildArray[e.detail.value],
        categoryId: this.data.categoryIndex
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success (res) {
        that.setData({
          projectList: res.data
        })
      }
    });
  },
  // 选择项目类别
  bindCategoryChange: function(e) {
    var that = this;
    this.setData({
      categoryIndex: e.detail.value
    });
    wx.request({
      url: basePath+"/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: this.data.buildArray[this.data.buildIndex],
        categoryId: this.data.categoryIndex 
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success (res) {
        that.setData({
          projectList: res.data
        })
      }
    });
  },

  //显示项目详情
  showProjectInfo: function(e) {
    app.globalData.projectId = e.currentTarget.dataset.id;
    app.globalData.categoryType = e.currentTarget.dataset.categorytype;
    app.globalData.pName = e.currentTarget.dataset.text
    var that = this;
    this.setData({
      // search: "search1"
    });

    wx.navigateTo({
      url: '/pages/project/projectInfo/projectInfo',
    })

    
  },

  

  //显示项目列表
  showProjectList: function(e) {
    var that = this;
    this.setData({
      // search: "search"
    });
    wx.request({
      url: basePath+"/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: this.data.buildArray[this.data.buildIndex],
        categoryId: this.data.categoryIndex 
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success (res) {
        that.setData({
          projectList: res.data
        })
      }
    });
  },

  
  

//--------------------------生命周期函数------------------------------



  onLoad: function(options){
      let page = this
      setTimeout(function(){
        page.setData({
            loadingHidden: true
        });
      }, 900);
      var that = this;
    var interval = setInterval(function(){
      wx.request({
        url: basePath+"/api/project/list", //请求路径
        method: 'post',
        data: {
          unitName: that.data.buildArray[that.data.buildIndex],
          categoryId: that.data.categoryIndex 
        },
        header: {
          'content-type': 'application/json', // 默认值
          'thirdSession': app.globalData.thirdSession
        },
        success (res) {
          that.setData({
            projectList: res.data
          });
          clearInterval(interval);
        }
      });
    },1000);
      this.setData({
          icon: base64.icon20
      });
      app.userLogin(function(){
        page.setData({
          hasUserInfo: app.globalData.hasUserInfo
        });
      });

  },

  onShow: function(){
    
  }
})