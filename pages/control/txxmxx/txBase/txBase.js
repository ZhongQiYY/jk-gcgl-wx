const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
import Toast from '@vant/weapp/toast/toast';
Page({

  data: {
    showBaseButton: false,//提交基本信息按钮显示隐藏
    showFiveButton: false,//提交五方信息按钮显示隐藏
    showZjButton: false,//提交资金信息按钮显示隐藏
    showDtButton: false,//提交单体情况按钮显示隐藏
    moneyUnit: "万元",
    buildArea: "万平米",
    coverArea: "亩",
    active: 0,//tabbar索引
    showLoadLoading: true,
    showUpLoadLoading: false,
    projectId:'',
    categoryType:'',
    showBasics: 0,
    showFive: 1,
    showMoney: 2,
    showPart: 3,
    projectInfo: {},//项目信息
    pmSpecialBuild:{},
    pmSpecialPark:{},
    pmSpecialMunicipal:{},
  },

  //提交基本信息
  baseFormSubmit: function(e){
    var that = this;
    that.setData({
      showUpLoadLoading: true,
      showBaseButton: false
    });
    var base = e.detail.value;
    var categoryType = base.categoryType;
    base.biddingType = base.biddingType==="公开招标"?0:1;
    base.buildType = base.buildType==="新建"?0:1;
    base.isDispatch = base.isDispatch==="否"?0:1;
    base.isExpropriation = base.isExpropriation==="否"?0:1;

    if(categoryType==="1"){
      that.data.pmSpecialBuild.id = base.specialId;
      that.data.pmSpecialBuild.buildNum = base.buildNum;
      that.data.pmSpecialBuild.houseNum = base.houseNum;
      that.data.pmSpecialBuild.storeNum = base.storeNum;
      that.data.pmSpecialBuild.businessArea = base.businessArea;
      that.data.pmSpecialBuild.houseArea = base.houseArea;
      base.pmSpecialBuild = that.data. pmSpecialBuild;
    }else if(categoryType==="2"){
      that.data.pmSpecialPark.id = base.specialId;
      that.data.pmSpecialPark.pathArea = base.pathArea;
      that.data.pmSpecialPark.paveArea = base.paveArea;
      that.data.pmSpecialPark.landscapeBridge = base.landscapeBridge;
      that.data.pmSpecialPark.treeNum = base.treeNum;
      that.data.pmSpecialPark.brightenNum = base.brightenNum;
      base.pmSpecialPark = that.data.pmSpecialPark;
    }else if(categoryType==="3"){
      that.data.pmSpecialMunicipal.id = base.specialId;
      that.data.pmSpecialMunicipal.roadLength = base.roadLength;
      that.data.pmSpecialMunicipal.roadWidth = base.roadWidth;
      that.data.pmSpecialMunicipal.carriagewayWidth = base.carriagewayWidth;
      that.data.pmSpecialMunicipal.sidewalkWidth = base.sidewalkWidth;
      that.data.pmSpecialMunicipal.pondWidth = base.pondWidth;
      base.pmSpecialMunicipal = that.data.pmSpecialMunicipal;
    }
    request.post(requestUrl.updateBaseInfo, base).then(res => {
      that.setData({
        showUpLoadLoading: false,
        pmSpecialBuild:{},
        pmSpecialPark:{},
        pmSpecialMunicipal:{}
      });
      Toast.success('上传成功');
    }).catch(err => {
      that.setData({
        showUpLoadLoading: false,
        showBaseButton: true,
        pmSpecialBuild:{},
        pmSpecialPark:{},
        pmSpecialMunicipal:{}
      });
      Toast.fail('上传失败');
    })
  },
  baseChange:function(e){
    this.setData({
      showBaseButton: true
    })
  },

  //提交五方信息
  fiveFormSubmit: function(e){
    var that = this;
    that.setData({
      showUpLoadLoading: true,
      showFiveButton: false
    });
    request.post(requestUrl.updateFiveInfo, e.detail.value).then(res => {
      that.setData({
        showUpLoadLoading: false
      });
      Toast.success('上传成功');
    }).catch(err => {
      that.setData({
        showUpLoadLoading: false,
        showFiveButton: true
      });
      Toast.fail('上传失败');
    })
  },
  fiveChange:function(e){
    this.setData({
      showFiveButton: true
    })
  },

  // 提交资金信息
  zjFormSubmit: function(e){
    var that = this;
    that.setData({
      showUpLoadLoading: true,
      showZjButton: false
    });
    var zj = e.detail.value;
    zj.categoryType = that.data.categoryType;
    request.post(requestUrl.updateMoneyInfo, zj).then(res => {
      that.setData({
        showUpLoadLoading: false
      });
      Toast.success('上传成功');
    }).catch(err => {
      that.setData({
        showUpLoadLoading: false,
        showZjButton: true
      });
      Toast.fail('上传失败');
    })
  },
  zjChange:function(e){
    this.setData({
      showZjButton: true
    })
  },

  // 提交单体情况



  onLoad: function (e) {
    var that = this;
    that.setData({
      projectId: e.projectId,
      categoryType: e.categoryType
    });
    request.post(requestUrl.projectInformation, {projectId:that.data.projectId,categoryType:that.data.categoryType}).then(res => {
      that.setData({
        projectInfo: res.data,
        showLoadLoading: false
      });
    }).catch(err => {
      that.setData({
        showLoadLoading: false
      })
    })
  },

  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail,
      showBaseButton: false,
      showFiveButton: false,
      showZjButton: false,
      showDtButton: false,
    })
  }
})