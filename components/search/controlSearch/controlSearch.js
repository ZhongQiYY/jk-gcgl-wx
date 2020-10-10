// components/search/controlSearch/controlSearch.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    projectNames:{
      type: Array,
      value: []
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    // 输入搜索内容时触发
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
      this.triggerEvent('inputTyping', { inputVal: this.data.inputVal });
    },
    // 点击项目时触发
    selectProject: function(e){
      this.triggerEvent('selectProject',{
        projectId: e.currentTarget.dataset.projectid,
        categoryType: e.currentTarget.dataset.categorytype,
        projectName: e.currentTarget.dataset.projectname
      });
      this.clearInput();
    }
  }
})
