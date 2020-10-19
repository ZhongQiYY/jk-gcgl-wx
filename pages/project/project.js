var base64 = require("../../dist/example/images/base64");
var auth = require("../../utils/getAuthInfo");
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
    isNotBuildUnit: true,//
    notShowLimit: false, //
    errorInfo: true, //展示隐藏错误提示
    dataHidden: true, //上滑触底显示数据加载钟
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

  // 点击图片触发
  toTableData: function(e){
    app.globalData.projectId = e.currentTarget.dataset.id;
    app.globalData.categoryType = e.currentTarget.dataset.categorytype;
    app.globalData.pName = e.currentTarget.dataset.text
    wx.switchTab({
      url: "/pages/tableData/tableData"
    })
  },

  // 选择建设单位
  bindBuildChange: function (e) {
    var that = this;
    this.setData({
      buildIndex: e.detail.value,
      haveNoData: false,
      pageNumber: 1
    });
    wx.request({
      url: basePath + "/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: this.data.buildArray[e.detail.value],
        categoryId: this.data.categoryIndex,
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
      categoryIndex: e.detail.value,
      haveNoData: false,
      pageNumber: 1
    });
    wx.request({
      url: basePath + "/api/project/list", //请求路径
      method: 'post',
      data: {
        unitName: this.data.buildArray[this.data.buildIndex],
        categoryId: this.data.categoryIndex,
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
    app.globalData.pName = e.currentTarget.dataset.text
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
            unitName: that.data.buildArray[that.data.buildIndex],
            categoryId: that.data.categoryIndex,
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
              unitName: that.data.buildArray[that.data.buildIndex],
              categoryId: that.data.categoryIndex,
              pageNumber: that.data.pageNumber,
              pageLimit: that.data.pageLimit
            },
            header: {
              'content-type': 'application/json', // 默认值
              'thirdSession': app.globalData.thirdSession
            },
            success(res) {
              that.setData({
                // projectList: that.data.projectList.concat(res.data),
                projectList: res.data,
                pageNumber: that.data.pageNumber+1,
                loadingHidden: true,
                errorInfo: true,
                isBuildUnit: auth.isBuildUnit(app.globalData.userInfo)
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

    this.setData({
      icon: base64.icon20
    });   
  },

  onShow: function () {
    var that = this;
    if(app.globalData.hasUserInfo && app.globalData.userInfo.state == 1){
      that.setData({
        notShowLimit: true
      })
    }else{
      that.setData({
        notShowLimit: false
      })
    }
  }
})