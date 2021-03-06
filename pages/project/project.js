// var base64 = require("../../dist/example/images/base64");
var auth = require("../../utils/getAuthInfo");
var app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
import Toast from '@vant/weapp/toast/toast';

Page({
  mixins: [require('../../dist/mixin/themeChanged')],

  data: {
    buildArray: [
      { text: '建设单位', value: '建设单位' },
      { text: '科技城', value: '科技城' },
      { text: '满园', value: '满园' },
      { text: '西城', value: '西城' },
      { text: '综保区', value: '综保区' },
      { text: '中恒工业', value: '中恒工业' },
      { text: '中恒商业', value: '中恒商业' },
      { text: '磊昇', value: '磊昇' },
      { text: '工建', value: '工建' }
    ],
    categoryArray: [
      { text: '类别', value: 0 },
      { text: '返迁棚改', value: 1 },
      { text: '工业厂房', value: 2 },
      { text: '商业地产', value: 3 },
      { text: '文教体卫', value: 4 },
      { text: '公园绿化', value: 5 },
      { text: '市政桥梁', value: 6 }
    ],
    buildValue: '建设单位',
    categoryValue: 0,
    rootPath: app.globalData.imageRootPath,
    projectList: [],//项目列表信息
    imageSize: { width: '260rpx', height: '160rpx' },//图片宽高
    iconSize: '50rpx',//图标大小
    showBuildUnit: false,//是否是建设单位
    notShowLimit: true, //是否展示无权限遮罩页
    dataHidden: true, //上滑触底显示数据加载中
    dataHidden_last: true, //项目全部加载出来后显示没有更多
    haveNoData: false, //是否还有项目没有加载完

    pageNumber: 1, // 当前页码
    pageLimit: 10, // 每页加载的条数

    desProgress: "19.9rpx", //进度条描述文字的大小
    proPercent: 50, //进度百分比
    proWidth: 20, //进度条宽度
    proDuration: 3, //进度条动画增加1%所需毫秒数
  },

  //为全局变量，项目名、项目类别、项目id赋值
  setProjectNameCategoryId: function (e) {
    app.globalData.projectId = e.currentTarget.dataset.id;
    app.globalData.categoryType = e.currentTarget.dataset.categorytype;
    app.globalData.projectName = e.currentTarget.dataset.text;
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

  // 选择建设单位
  bindBuildChange: function (e) {
    var that = this;
    Toast.loading({ duration:10000,forbidClick:true,message:'加载中',mask:true });
    this.setData({
      buildValue: e.detail,
      haveNoData: false,
      pageNumber: 1
    });

    request.get(requestUrl.projectCardList+'?unitName='+that.data.buildValue+'&categoryId='+that.data.categoryValue+'&pageNumber='+that.data.pageNumber+'&pageLimit='+that.data.pageLimit).then(res => {
      that.setData({
        projectList: res.data,
      });
      Toast.clear();
    }, err => {
      Toast.clear();
      Toast.fail(err.msg);
    })

  },
  // 选择项目类别
  bindCategoryChange: function (e) {
    var that = this;
    Toast.loading({ duration:10000,forbidClick:true,message:'加载中',mask:true });
    this.setData({
      categoryValue: e.detail,
      haveNoData: false,
      pageNumber: 1
    });

    request.get(requestUrl.projectCardList+'?unitName='+that.data.buildValue+'&categoryId='+that.data.categoryValue+'&pageNumber='+that.data.pageNumber+'&pageLimit='+that.data.pageLimit).then(res => {
      that.setData({
        projectList: res.data,
      });
      Toast.clear();
    }, err => {
      Toast.clear();
      Toast.fail(err.msg);
    })
  },

  //下拉触发
  onPullDownRefresh: function () {
    var that = this;
    if (that.data.notShowLimit) {
      that.setData({
        projectList: []
      })
      that.onLoad();
    }
  },

  //触底触发
  onReachBottom() {
    var that = this;
    if (!that.data.haveNoData) {
      that.setData({
        dataHidden: false,
        pageNumber: that.data.pageNumber + 1,
      });

      request.get(requestUrl.projectCardList+'?unitName='+that.data.buildValue+'&categoryId='+that.data.categoryValue+'&pageNumber='+that.data.pageNumber+'&pageLimit='+that.data.pageLimit).then(res => {
        if (res.data.length > 0) {
          that.setData({
            dataHidden: true,
            projectList: that.data.projectList.concat(res.data),
          });
        } else {
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
      }, err => {})

    } else {
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


  onLoad: function (options) {
    var that = this;
    Toast.loading({ duration:10000,forbidClick:true,message:'加载中',mask:true });
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
            notShowLimit: true,
            pageNumber: 1
          });
          request.get(requestUrl.projectCardList+'?unitName='+that.data.buildValue+'&categoryId='+that.data.categoryValue+'&pageNumber='+that.data.pageNumber+'&pageLimit='+that.data.pageLimit).then(res => {
            app.globalData.clickLoginBtn = false;
            that.setData({
              projectList: res.data,
              showBuildUnit: auth.showBuildUnit(app.globalData.userInfo)
            });
            Toast.clear();
          }, err => {
            app.globalData.clickLoginBtn = false;
            Toast.fail(err.msg);
          })

        } else {
          Toast.clear();
          that.setData({ notShowLimit:false });
        }
      },
      function () {
        console.log("登录失败的触发");
        Toast.clear();
        that.setData({ notShowLimit:false });
      }
    );
  },

  onShow: function () {
    var that = this;
    if (app.globalData.hasUserInfo && app.globalData.userInfo.state == 1) {
      //在微信未登录，点击了微信登录后再次回来会触发此函数
      if (app.globalData.clickLoginBtn) {
        that.setData({
          notShowLimit: true,
          projectList: [],
        });
        that.onLoad();
      }
    } else {
      that.setData({ notShowLimit:false })
    }
  },




  // 跳转安全检查
  gotoAqjc: function (e) {
    var that = this;
    that.setProjectNameCategoryId(e);
  },
  // 跳转质量监控
  gotoZljc: function (e) {
    var that = this;
    that.setProjectNameCategoryId(e);
  },
  // 跳转签证审批
  gotoQzsp: function (e) {
    var that = this;
    that.setProjectNameCategoryId(e);
  },
  // 跳转督办事项
  gotoDbsx: function (e) {
    var that = this;
    that.setProjectNameCategoryId(e);
    wx.navigateTo({
      url: '/pages/tableData/datapages/dbsx/dbsx',
    })
  },
  // 跳转问题建议
  gotoWtjy: function (e) {
    var that = this;
    that.setProjectNameCategoryId(e);
    wx.navigateTo({
      url: '/pages/tableData/datapages/wtjy/wtjy',
    })
  },
})