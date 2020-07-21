const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    records:[
      {
        id:'1',
        content:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        finalTime:'2020-07-14',
        zb:'喜子软件1',
        xb:'计划统计部1'
      },
      {
        id:'2',
        content:'xix哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈i',
        finalTime:'2020-07-15',
        zb:'喜子软件2',
        xb:'计划统计部2'
      },
      {
        id:'3',
        content:'hehe',
        finalTime:'2020-07-16',
        zb:'喜子软件3',
        xb:'计划统计部3'
      }
    ],
  },

  toDetails: function(obj) {
    let content = obj.currentTarget.dataset.content
    wx.navigateTo({
      url: '/pages/control/dcdb/details/details?content=' + content,
    })
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
   * 搜索日期给初值
   */
  onShow: function () {
    // this.getRecords();
  },

  getRecords: function(){
    // wx.request({
    //   url: "http://localhost:16000/jk-gcgl/gcgl/pmDb/list", //请求路径
    //   method: 'post',
    //   data: {

    //   },
    //   header: {
    //     'content-type': 'application/json', // 默认值
    //   },
    //   success (res) {
    //     if (res.statusCode == 200) {
    //       console.log(res.data);
    //       if (res.data.code == 200) {
    //         that.setData({
    //           records: res.data.data,
    //         })
    //       }else{
    //         wx.showToast({
    //           title: res.data.msg,
    //           icon: 'success',
    //           duration: 2000
    //         });
    //         console.log("dcdb.js getRecords() error res:----->>>>");
    //         console.log(res);
    //       }
    //     }
    //   }
    // });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  add: function(obj){
    wx.navigateTo({
      url: '/pages/control/dcdb/add/add',
    })
  },

  del: function(obj){

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

  },

  del: function(event){
      console.log(event);
      let id = event.target.dataset;
      console.log(id);
      // 调用接口数据
    wx.request({
      //后台接口
      url: 'http://localhost:16000/jk-gcgl/api/db/gcgl/pmDb/delete',
      method: 'POST',
      data: id,
      success: function(res) {
        if (res && res.code == 200) {
          wx.navigateBack()
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg,
          })
        }
      }
    });
  }
})