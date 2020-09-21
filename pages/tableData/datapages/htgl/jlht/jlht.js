const app = getApp();
// const RootPath = "http://localhost:16000";
const RootPath = app.globalData.imageRootPath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileName:[],
    jlht:[],
    RootPath: RootPath
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

  //查询接口，onshow中调用
  getJlht: function(){
    console.log("调用getJlht");
    var that = this;
    wx.request({
      url: RootPath + "/jk-gcgl/api/htgl/pmHtgl/jlht?pId="+12, //请求路径
      method: 'post',
      data: {
        
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success (res) {
        if (res.statusCode == 200) {
          console.log(res.data);
          if (res.data.code == 200) {
            let arr = res.data.data.split(',');
            let length = arr.length;
            let jlht = [];
            let fileName = [];
            for(let i = 0;i<length/2;i++){
              jlht[i] = arr[i];
            }
            let j = 0;
            for(let i = length/2;i<length;i++){
              fileName[j++] = arr[i]
            }
            that.setData({
              jlht: jlht,
              fileName: fileName
            })
            console.log(jlht)
            console.log(fileName)
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            });
            console.log(res);
          }
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getJlht();
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

  },

  //打开文件
  preview: function (e) {
    //app.showToast('文件加载中..');
    wx.showLoading({
      title: '加载中..',
      mask: true
    });
    this.downloadFile(e);
  },

  downloadFile: function(e){
    var that = this;
    console.log(that);
    var fileName = that.data.fileName
    var index = 0;
    var title = e.currentTarget.dataset.title
    for(let k = 0;k<fileName.length;k++){
        if(fileName[k]==title){
          index = k;
        }
    }
    console.log(that.data)
    wx.downloadFile({
      url: RootPath + that.data.jlht[index],
      header: {
        // 'Accept': '*/*',
        'content-type': '*/*', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success: function (res) {
        var filePath = res.tempFilePath
        console.log(filePath)
        wx.openDocument({
          filePath: filePath,
          fileType: that.data.type,
          success: function (res) {
            console.log("打开文档成功")
            console.log(res);
          },
          fail: function (res) {
            console.log("fail");
            app.showToast('文件显示失败');
            console.log(res)
          },
          complete: function (res) {
            wx.hideLoading();
            console.log("complete");
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log('fail')
        app.showToast('文件下载失败');
        console.log(res)
      },
      complete: function (res) {
        wx.hideLoading();
        console.log('complete')
        console.log(res)
      }
    })
  },
})