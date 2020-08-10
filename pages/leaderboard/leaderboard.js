// pages/charts/charts.js
const app = getApp();
Page({

// -------------------- 数据区域 --------------------
  data: {
    rankData: [
      // {integrated: "满园", projectNum: "", standardsNum: "", standardsRate: "", buildArea: "", totalInvestment: "", projectInvestment: "", monthOutput: ""},
      // {integrated: "科技城", projectNum: "", standardsNum: "", standardsRate: "", buildArea: "", totalInvestment: "", projectInvestment: "", monthOutput: ""},
      // {integrated: "综保区", projectNum: "", standardsNum: "", standardsRate: "", buildArea: "", totalInvestment: "", projectInvestment: "", monthOutput: ""},
      // {integrated: "中恒商业", projectNum: "", standardsNum: "", standardsRate: "", buildArea: "", totalInvestment: "", projectInvestment: "", monthOutput: ""},
      // {integrated: "中恒工业", projectNum: "", standardsNum: "", standardsRate: "", buildArea: "", totalInvestment: "", projectInvestment: "", monthOutput: ""},
      // {integrated: "西城", projectNum: "", standardsNum: "", standardsRate: "", buildArea: "", totalInvestment: "", projectInvestment: "", monthOutput: ""},
      // {integrated: "工建", projectNum: "", standardsNum: "", standardsRate: "", buildArea: "", totalInvestment: "", projectInvestment: "", monthOutput: ""},
      // {integrated: "磊昇", projectNum: "", standardsNum: "", standardsRate: "", buildArea: "", totalInvestment: "", projectInvestment: "", monthOutput: ""}
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
    url: "http://localhost:16000/jk-gcgl/api/leaderboard/leaderboard/list", //请求路径
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
          that.setData({
            rankData: res.data.data,
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