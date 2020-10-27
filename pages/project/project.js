// var base64 = require("../../dist/example/images/base64");
var auth = require("../../utils/getAuthInfo");
var app = getApp();
var basePath = app.globalData.basePath;
Page({
  mixins: [require('../../dist/mixin/themeChanged')],

 

  data: {
    buildArray: [
      {text:'全部建设单位', value:'全部建设单位'},
      {text:'科技城', value:'科技城'},
      {text:'满园', value:'满园'},
      {text:'西城', value:'西城'},
      {text:'综保区', value:'综保区'},
      {text:'中恒工业', value:'中恒工业'},
      {text:'中恒商业', value:'中恒商业'},
      {text:'磊昇', value:'磊昇'},
      {text:'工建', value:'工建'}
    ],
    categoryArray: [
      {text:'全部类别', value:'全部类别'},
      {text:'返迁棚改', value:'1'},
      {text:'工业厂房', value:'2'},
      {text:'商业地产', value:'3'},
      {text:'文教体卫', value:'4'},
      {text:'公园绿化', value:'5'},
      {text:'市政桥梁', value:'6'}
    ],
    buildValue: '全部建设单位',
    categoryValue: '全部类别',
    rootPath: app.globalData.imageRootPath,
    projectList: [],//项目列表信息
    loadingHidden: false,
    imageSize:{width: '260rpx',height: '160rpx'},//图片宽高
    iconSize: '50rpx',//图标大小
    isBuildUnit: true,//是否是建设单位
    notShowLimit: false, //是否展示无权限遮罩页
    errorInfo: true, //展示隐藏错误提示
    dataHidden: true, //上滑触底显示数据加载中
    dataHidden_last: true, //项目全部加载出来后显示没有更多
    haveNoData: false, //是否还有项目没有加载完

    pageNumber: 1, // 当前页码
    pageLimit: 10, // 每页加载的条数
    
    desProgress: "19.9rpx", //进度条描述文字的大小
    proPercent: 50, //进度百分比
    proWidth: 20, //进度条宽度
    proDuration: 3, //进度条动画增加1%所需毫秒数
    proColor: "#09BB07", //进度条的颜色
  },

  //为全局变量，项目名、项目类别、项目id赋值
  setProjectNameCategoryId:function(e){
    app.globalData.projectId = e.currentTarget.dataset.id;
    app.globalData.categoryType = e.currentTarget.dataset.categorytype;
    app.globalData.projectName = e.currentTarget.dataset.text;
  },

  // 跳转安全检查
  gotoAqjc:function(e){
    var that = this;
    that.setProjectNameCategoryId(e);

  },
  // 跳转质量监控
  gotoZljc:function(e){
    var that = this;
    that.setProjectNameCategoryId(e);
  },
  // 跳转签证审批
  gotoQzsp:function(e){
    var that = this;
    that.setProjectNameCategoryId(e);
  },
  // 跳转督办事项
  gotoDbsx:function(e){
    var that = this;
    that.setProjectNameCategoryId(e);
    wx.navigateTo({
      url: '/pages/tableData/datapages/dbsx/dbsx',
    })
  },
  // 跳转提醒事项
  gotoTxsx:function(e){
    var that = this;
    that.setProjectNameCategoryId(e);
  },


  // 选择建设单位
  bindBuildChange: function (e) {
    var that = this;
    this.setData({
      buildValue: e.detail,
      haveNoData: false,
      pageNumber: 1
    });
    wx.request({
      url: basePath + "/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: that.data.buildValue,
        categoryId: that.data.categoryValue,
        pageNumber: that.data.pageNumber,
        pageLimit: that.data.pageLimit
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        if(res.data.length > 0) {
          that.setData({
            dataHidden: true,
            pageNumber: that.data.pageNumber+1,
            projectList: res.data,
          });
        }else {
          that.setData({
            dataHidden: true,
            dataHidden_last: false,
          });
          setTimeout(function () {
            that.setData({
              dataHidden_last: true,
            })
          }, 3000);
        }
      }
    });
  },
  // 选择项目类别
  bindCategoryChange: function (e) {
    var that = this;
    this.setData({
      categoryValue: e.detail,
      haveNoData: false,
      pageNumber: 1
    });
    wx.request({
      url: basePath + "/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: this.data.buildValue,
        categoryId: this.data.categoryValue,
        pageNumber: that.data.pageNumber,
        pageLimit: that.data.pageLimit
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        if(res.data.length > 0) {
          that.setData({
            dataHidden: true,
            pageNumber: that.data.pageNumber+1,
            projectList: res.data,
          });
        }else {
          that.setData({
            dataHidden: true,
            dataHidden_last: false,
          });
          setTimeout(function () {
            that.setData({
              dataHidden_last: true,
            })
          }, 3000);
        }
      }
    });
  },

  //显示项目详情
  showProjectInfo: function (e) {
    app.globalData.projectId = e.currentTarget.dataset.id;
    app.globalData.categoryType = e.currentTarget.dataset.categorytype;
    app.globalData.projectName = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '/pages/project/projectInfo/projectInfo',
    })
  },

  //下拉触发
  onPullDownRefresh: function () {
    var that = this;
    if(that.data.notShowLimit){
      that.setData({
        projectList: [],
        loadingHidden: false
      })
      that.onLoad();
    }
  },

  //触底触发
  onReachBottom() {
    var that = this;
    if(!that.data.haveNoData){
      if(that.data.errorInfo && that.data.loadingHidden){
        that.setData({
          dataHidden: false
        })
        wx.request({
          url: basePath + "/api/project/list", //请求路径
          method: 'post',
          data: {
            unitName: that.data.buildValue,
            categoryId: that.data.categoryValue,
            pageNumber: that.data.pageNumber,
            pageLimit: that.data.pageLimit
          },
          header: {
            'content-type': 'application/json', // 默认值
            'thirdSession': app.globalData.thirdSession
          },
          success(res) {
            if(res.data.length > 0) {
              that.setData({
                dataHidden: true,
                pageNumber: that.data.pageNumber+1,
                projectList: that.data.projectList.concat(res.data),
              });
            }else {
              that.setData({
                dataHidden: true,
                dataHidden_last: false,
              });
              setTimeout(function () {
                that.setData({
                  dataHidden_last: true,
                  haveNoData: true
                })
              }, 3000);
            }
            
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
      }
    }else{
      that.setData({
        dataHidden: true,
        dataHidden_last: false,
      });
      setTimeout(function () {
        that.setData({
          dataHidden_last: true,
        })
      }, 3000);
    }  
  },

  //--------------------------生命周期函数------------------------------
  onLoad: function (options) {
    var that = this;
    wx.stopPullDownRefresh();
    that.setData({
      pageNumber: 1,
      haveNoData: false
    });

    //用户登录
    app.userLogin(
      function () {
        console.log("登录成功的触发"); 
        if (app.globalData.hasUserInfo && app.globalData.userInfo.state == 1) {
          that.setData({
            loadingHidden: false,
            errorInfo: true,
            notShowLimit: true
          })
          wx.request({
            url: basePath + "/api/project/list", //请求路径
            method: 'post',
            data: {
              unitName: that.data.buildValue,
              categoryId: that.data.categoryValue,
              pageNumber: that.data.pageNumber,
              pageLimit: that.data.pageLimit
            },
            header: {
              'content-type': 'application/json', // 默认值
              'thirdSession': app.globalData.thirdSession
            },
            success(res) {
              app.globalData.clickLoginBtn = false;
              that.setData({
                projectList: res.data,
                pageNumber: that.data.pageNumber+1,
                loadingHidden: true,
                errorInfo: true,
                isBuildUnit: auth.isBuildUnit(app.globalData.userInfo)
              });
              
            },
            fail() {
              app.globalData.clickLoginBtn = false;
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
            errorInfo: true,
            notShowLimit: false
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
        console.log("登录失败的触发");
        that.setData({
          loadingHidden: true,
          errorInfo: false,
        })
      }
    ); 
  },

  onShow: function () {
    var that = this;
    if(app.globalData.hasUserInfo && app.globalData.userInfo.state == 1){
      //在微信未登录，点击了微信登录后再次回来会触发此函数
      if(app.globalData.clickLoginBtn){
    
        that.setData({
          notShowLimit: true,
          projectList: [],
          loadingHidden: false
        });

        that.onLoad();
      }
    }else{
      that.setData({
        notShowLimit: false
      })
    }
  }
})