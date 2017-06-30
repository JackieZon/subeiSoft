//app.js
App({
  baseUrl:'http://wx-print.subei88.com:8080/api/',
  request(url,param,callback){
    var t_data = this;
    wx.request({
      url: t_data.baseUrl + url, //仅为示例，并非真实的接口地址
      data: param,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        if(typeof(callback)=='function'){
          callback(res)
        }
      }
    })
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})