// components/card/ydxxCard/ydxxCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    proMainName: String,//工序名称
    scheduleInfoList: Array //进度条信息列表
  },

  /** 
   * 组件的初始数据
   */
  data: {
    desProgress: "19.9rpx", //进度条描述文字的大小
    proWidth: 20, //进度条宽度
    proDuration: 3, //进度条动画增加1%所需毫秒数
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
