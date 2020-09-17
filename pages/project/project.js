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
    projectListShow: true,
    projectInfoShow: false,
    projectName: "",
    search: "search",
    imagePath: "",
    categoryType: 0,
    projectInfo: {},
    isJbxxShow: false,
    isWfxxShow: false,
    isZjqkShow: false,
    isDtqkShow: false,
    loadingHidden: false,
    moneyUnit: "万元",
    buildArea: "万平米",
    coverArea: "亩",
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
    var that = this;
    this.setData({
      projectListShow: false,
      projectInfoShow: true,
      projectName: e.currentTarget.dataset.text,
      categoryType: e.currentTarget.dataset.categorytype,
      search: "search1"
    });

    wx.request({
      url: basePath+"/api/project/projectBaseInfo", //请求路径
      method: 'post',
      data: {
        projectId: app.globalData.projectId,
        categoryType: app.globalData.categoryType
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success (res) {
        console.log(res.data)
        that.setData({
          projectInfo: res.data
        });
        that.setData({
          imagePath: that.data.rootPath+res.data.effectPicture
        })
      }
    });
  },

  //跳转到数据表界面
  toTableData: function() {
    app.globalData.pName = this.data.projectName;
    wx.switchTab({ 
      url: '/pages/tableData/tableData'
    });
  },

  //显示项目列表
  showProjectList: function(e) {
    var that = this;
    this.setData({
      projectListShow: true,
      projectInfoShow: false,
      search: "search"
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

  //点击五方信息触发
  towfxx: function(e) {
    setTimeout(function(){
      wx.pageScrollTo({
        duration: 300,
        selector: '#wfxx'
        // scrollTop: 0
      });
    },600);
    this.setData({
      isWfxxShow: !this.data.isWfxxShow,
      isJbxxShow: false,
      isZjqkShow: false,
      isDtqkShow: false
    })
    
  },
  //点击基本信息触发
  toJbxx: function(e) {
    setTimeout(function(){
      wx.pageScrollTo({
        duration: 300,
        selector: '.jbxx'
        // scrollTop: 0
      });
    },600);
    this.setData({
      isJbxxShow: !this.data.isJbxxShow,
      isWfxxShow: false,
      isZjqkShow: false,
      isDtqkShow: false
    })
  },
  //点击资金信息触发
  toZjqk: function(e) {
    setTimeout(function(){
      wx.pageScrollTo({
        duration: 300,
        selector: '.zjqk'
        // scrollTop: 0
      });
    },600);
    
    this.setData({
      isZjqkShow: !this.data.isZjqkShow,
      isWfxxShow: false,
      isJbxxShow: false,
      isDtqkShow: false
    })
  },
  //点击单体情况触发
  toDtqk: function(e) {
    setTimeout(function(){
      wx.pageScrollTo({
        duration: 300,
        selector: '.dtqk'
        // scrollTop: 0
      });
    },600);
    
    this.setData({
      isDtqkShow: !this.data.isDtqkShow,
      isWfxxShow: false,
      isJbxxShow: false,
      isZjqkShow: false,
    })
  },
  

//--------------------------生命周期函数------------------------------



  onLoad: function(options){
      let page = this
      setTimeout(function(){
        page.setData({
            loadingHidden: true
        });
      }, 900);
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
  }
})