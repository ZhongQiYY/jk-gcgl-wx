// pages/control/tjqzsp/tjqzsp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOther: true,
    active: 0,//tabbar索引
    date: '',
    show: false,
    activeNames: ['1'],
    problemPlanList:[
      {
        unitName: "综保区", projectName: "标准厂房三期", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-08-27", commitName: "刘杭"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-09-27", commitName: "缪隽峰"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
        ]
      },
      {
        unitName: "满园", projectName: "水韵康居四期项目", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-08-27", commitName: "刘杭"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-09-27", commitName: "缪隽峰"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
        ]
      },
      {
        unitName: "满园", projectName: "香江棚户区改造安居小区", timeNameList: [
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-09-27", commitName: "缪隽峰"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
          {submitTime: "2020-11-27", commitName: "高镪"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-12-27", commitName: "温龙飞"},
        ]
      },
      {
        unitName: "西城", projectName: "工业路（客家大道-赣丰路）", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
        ]
      },
      {
        unitName: "中恒工业", projectName: "金凤智谷一期项目", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
        ]
      },
      {
        unitName: "中恒商业", projectName: "蟠龙返乡创业基地项目西地块", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
        ]
      },
      {
        unitName: "磊昇", projectName: "赣州经济技术开发区第一中学新建工程", timeNameList: [
          {submitTime: "2020-09-27", commitName: "钟祺"},
          {submitTime: "2020-06-27", commitName: "吴忠喜"},
          {submitTime: "2020-11-27", commitName: "高镪"},
        ]
      },
    ],
  },

  tabbarChange: function(e){
    var that = this;
    that.setData({
      active: e.detail,
      showOther: !that.data.showOther
    })
  },
  collapseChange: function(e){
    this.setData({
      activeNames: e.detail,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})