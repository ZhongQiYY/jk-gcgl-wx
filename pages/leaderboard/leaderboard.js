// pages/charts/charts.js
const app = getApp();
var basePath = app.globalData.basePath;
Page({

// -------------------- 数据区域 --------------------
  data: {
    rankData: [
      
    ],
    titleList: [
      // {columnName: 'integrated', title: '综合排名'},
      {columnName: 'projectNum', title: '项目个数',data: []},
      {columnName: 'standardsNum', title: '达标项目',data: []},
      {columnName: 'standardsRate', title: '达标率',data: []},
      {columnName: 'buildArea', title: '建筑面积',data: []},
      {columnName: 'totalInvestment', title: '总投资',data: []},
      {columnName: 'projectInvestment', title: '工程投资',data: []},
      {columnName: 'monthOutput', title: '本月产值',data: []},
    ]
  },

// -------------------- 监听wxml文件事件区域 --------------------


// -------------------- 生命周期函数区域 --------------------
onLoad: function (options) {
  this.getRankData();
},


getRankData: function(){
  var that = this;
  wx.request({
    url: basePath + "/api/leaderboard/leaderboard/list", //请求路径
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
          let dataList = res.data.data
          let titleList = that.data.titleList
          for(let i=0;i<dataList.length;i++) {
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
              titleList[3].data.push(dataList[i].buildArea)
            } else {
              titleList[3].data.push('-')
            }
            if (dataList[i].totalInvestment) {
              titleList[4].data.push(dataList[i].totalInvestment)
            } else {
              titleList[4].data.push('-')
            }
            if (dataList[i].projectInvestment) {
              titleList[5].data.push(dataList[i].projectInvestment)
            } else {
              titleList[5].data.push('-')
            }
            if (dataList[i].monthOutput) {
              titleList[6].data.push(dataList[i].monthOutput)
            } else {
              titleList[6].data.push('-')
            }
          }
          console.log(titleList)
          that.setData({
            rankData: res.data.data,
            titleList: titleList
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          });
          console.log("leaderboard.js getRankData() error res:----->>>>");
          console.log(res);
        }
      }
    }
  });
},
})