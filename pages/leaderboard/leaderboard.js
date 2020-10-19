// pages/charts/charts.js
const app = getApp();
var basePath = app.globalData.basePath;
Page({

  // -------------------- 数据区域 --------------------
  data: {
    display: 'none',
    rankData: [],
    productContent: [],
    notShowLimit: false,
    projectListShow: true,
    projectInfoShow: false,
    loadingHidden: true,
    titleList: [
      // {columnName: 'integrated', title: '综合排名'},
      { columnName: 'projectNum', title: '项目个数', data: [] },
      { columnName: 'standardsNum', title: '达标项目', data: [] },
      { columnName: 'standardsRate', title: '达标率', data: [] },
      { columnName: 'buildArea', title: '建筑面积', data: [] },
      { columnName: 'totalInvestment', title: '总投资', data: [] },
      { columnName: 'projectInvestment', title: '工程投资', data: [] },
      { columnName: 'monthOutput', title: '本月产值', data: [] },
    ]
  },

  // -------------------- 监听wxml文件事件区域 --------------------
  //下拉触发
  onPullDownRefresh: function () {
    var that = this;
    if(that.data.notShowLimit){
      that.setData({
        rankData: [],
        titleList: [
          // {columnName: 'integrated', title: '综合排名'},
          { columnName: 'projectNum', title: '项目个数', data: [] },
          { columnName: 'standardsNum', title: '达标项目', data: [] },
          { columnName: 'standardsRate', title: '达标率', data: [] },
          { columnName: 'buildArea', title: '建筑面积', data: [] },
          { columnName: 'totalInvestment', title: '总投资', data: [] },
          { columnName: 'projectInvestment', title: '工程投资', data: [] },
          { columnName: 'monthOutput', title: '本月产值', data: [] },
        ],
        loadingHidden: false
      })
      that.onLoad();
    }
    
  },

  getRankData: function () {
    var that = this;
    that.setData({
      loadingHidden: false
    })
    wx.request({
      url: basePath + "/api/leaderboard/leaderboard/list", //请求路径
      method: 'post',
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            let dataList = res.data.data
            let titleList = that.data.titleList
            for (let i = 0; i < dataList.length; i++) {
              if (dataList[i].projectNum) {
                titleList[0].data.push(dataList[i].projectNum)
              } else {
                titleList[0].data.push('-')
              }
              if (dataList[i].standardsNum) {
                titleList[1].data.push(dataList[i].standardsNum)
              } else {
                titleList[1].data.push('-')
              }
              if (dataList[i].standardsRate) {
                titleList[2].data.push(dataList[i].standardsRate)
              } else {
                titleList[2].data.push('-')
              }
              if (dataList[i].buildArea) {
                titleList[3].data.push(dataList[i].buildArea.toFixed(2))
              } else {
                titleList[3].data.push('-')
              }
              if (dataList[i].totalInvestment) {
                titleList[4].data.push(dataList[i].totalInvestment.toFixed(2))
              } else {
                titleList[4].data.push('-')
              }
              if (dataList[i].projectInvestment) {
                titleList[5].data.push(dataList[i].projectInvestment.toFixed(2))
              } else {
                titleList[5].data.push('-')
              }
              if (dataList[i].monthOutput) {
                titleList[6].data.push(dataList[i].monthOutput.toFixed(2))
              } else {
                titleList[6].data.push('-')
              }
            }
            that.setData({
              rankData: res.data.data,
              titleList: titleList,
              loadingHidden: true,
            })
          } else {
            that.setData({
              loadingHidden: false,
            });       
          }
        }
        
      }
    });
  },

  test: function (e) {
    let title = e.currentTarget.dataset.title
    let projectName = this.data.rankData[e.currentTarget.dataset.index].integrated;
    let ids = this.data.rankData[e.currentTarget.dataset.index].standardsId;
    var that = this;
    wx.request({
      url: basePath + "/api/project/lists", //请求路径
      method: 'post',
      data: {
        unitName: projectName,
        categoryId: 0
      },
      header: {
        'content-type': 'application/json', // 默认值
        'thirdSession': app.globalData.thirdSession
      },
      success(res) {
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < ids.length; j++) {
            if (ids[j] == res.data[i].id) {
              res.data[i].color = "green";
              break;
            } else {
              res.data[i].color = "red";
            }
          }
        }
        that.setData({
          projectInfoShow: true,
          productContent: res.data
        });
        console.log(res.data)
      }
    });
  },

  //跳转到数据表界面
  toTableData: function (e) {
    console.log(e.currentTarget.dataset)
    app.globalData.pName = e.currentTarget.dataset.text;
    app.globalData.projectId = e.currentTarget.dataset.id;
    app.globalData.categoryType = e.currentTarget.dataset.categorytype;
    wx.switchTab({
      url: '/pages/tableData/tableData'
    });
  },
  hideview: function () {
    this.setData({
      projectInfoShow: false,
    });
  },

  // -------------------- 生命周期函数区域 --------------------
  onLoad: function (options) {
    var that = this;
    if (app.globalData.hasUserInfo && app.globalData.userInfo.state == 1) {
      that.getRankData();
    }
    
  },

  onShow: function () {
    var that = this;
    if (app.globalData.hasUserInfo && app.globalData.userInfo.state == 1) {
      that.setData({
        notShowLimit: true
      });
    }else{
      that.setData({
        notShowLimit: false
      })
    }
  }
  
})