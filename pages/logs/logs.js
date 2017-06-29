//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  goPage(){
    wx.navigateTo({
      url: './../api/page-chenge/new-page'
    })
  },
  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(function (log) {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    this.setData({
      logs: [
        '日志内容S'
      ]
    })
  }
})
