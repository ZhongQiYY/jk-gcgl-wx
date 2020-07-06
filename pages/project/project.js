var base64 = require("../../dist/example/images/base64");
Page({
  mixins: [require('../../dist/mixin/themeChanged')],

  data: {
    buildArray: ['--请选择--','科技城', '满园', '西城', '综保区', '中恒工业', '中恒商业', '磊昇', '工建'],
    categoryArray: ['--请选择--','返迁棚改', '工业厂房', '商业地产', '文教体卫', '公园绿化', '市政桥梁'],
    buildIndex: 0,
    categoryIndex: 0,

    projectList: [
      {id: "", projectName: "华昌新材料产业园（能之光代建）标准厂房", explain: "新建项目"},
      {id: "", projectName: "华昌科技园标准厂房", explain: "新建项目"},
      {id: "", projectName: "秋山科技园标准厂房", explain: "新建项目"},
      {id: "", projectName: "江奥科技园标准厂房", explain: "新建项目"},
      {id: "", projectName: "涌泉科技园标准厂房", explain: "续建项目"},
      {id: "", projectName: "横江产业园标准厂房", explain: "续建项目"},
      {id: "", projectName: "金凤智谷一期项目", explain: "续建项目"},
      {id: "", projectName: "秋月科技园标准厂房", explain: "新建项目"},
      {id: "", projectName: "春花科技园", explain: "续建项目"},
      {id: "", projectName: "横江产业园标准厂房", explain: "新建项目"},
    ]
  },

  // 选择建设单位
  bindBuildChange: function(e) {
    this.setData({
      buildIndex: e.detail.value
    })
  },
  // 选择项目类别
  bindCategoryChange: function(e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },

//--------------------------生命周期函数------------------------------


  onLoad: function(){
      this.setData({
          icon: base64.icon20
      });
  }
})