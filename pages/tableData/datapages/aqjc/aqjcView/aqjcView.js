const app = getApp();
var request = app.globalData.request;
var requestUrl = app.globalData.requestUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    unitName: '', 
    projectName: '',
    finalTime: '',
    timeNameList: [],
    time: 6 *1000,
  },

  collapseChange: function (e) {
    this.setData({
      activeNames: e.detail,
    });
  },

  finished(e) {
    console.log(e)
    var that = this
    let data = {
      'id': e.target.dataset.id,
    }
    request.post(requestUrl.updateAqjcIsOuttimeById, data).then(res => {
      if(res.code == 200) {
        console.log("类别："+"项目id："+app.globalData.projectId+"已超时")
      }
    },err=>{

    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let data = {
      'status': options.status,
      'projectId': app.globalData.projectId
    }
    request.get(requestUrl.listProblemByStatus, data).then(res => {
      if(res.code == 200) {
        if(res.data.length > 0) {
          that.setData({
            unitName: res.data[0].project.unitName,
            projectName: res.data[0].project.projectName,
            timeNameList: res.data
          })
        }
      }
    }).catch(
    
    );
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