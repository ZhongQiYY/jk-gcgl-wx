// components/dialog/selectDialog/selectDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    notShowDialog: Boolean,
    radioItems: Array,
    dialogHeight: {
      type: String,
      value: '800rpx'
    },
    dialogWidth: {
      type: String,
      value: '600rpx'
    },
    dialogRadius: {
      type: String,
      value: '36rpx'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select: function(e) {
  
      var selectValue = e.currentTarget.dataset.selectvalue;
  
      //发射一个方法，由该方法携带子组件数据传递给父组件的方法，
      //该方法将使用bind:绑定在组件标签上
      this.triggerEvent('getSelectValue', {selectValue: selectValue, notShowDialog: true});
    },
    closeDialog: function(e) {
      this.triggerEvent('closeDialog', {notShowDialog: true});
    }
  }
})
