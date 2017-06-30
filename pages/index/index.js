//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    radioItems: [
      {id: '1', value: 'A4黑白', cash:'0.5', checked: 'true'},
      {id: '2', value: 'A4彩色', cash:'3.0',},
    ],
    motto: '速贝 - 软件',
    userInfo: {},
    tempFilePath: '',
    savedFilePath: wx.getStorageSync('savedFilePath') || '',
    dialog: {
      hidden: true
    }
  },
  payOrder(){

    var that=this;
    var t_url = 'SystemUser/GetSystemUserList';
    var t_param = {}

    app.request(t_url,t_param,function(res){
      
      wx.showModal({
          title: '提示',
          content: JSON.stringify(res),
          success: function(res) {
              if (res.confirm) {
                  console.log('用户点击确定')
              }
          }
      });

    });

  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          tempFilePath: res.tempFilePaths[0]
        })
      }
    })
  },
  saveFile: function () {
    if (this.data.tempFilePath.length > 0) {
      var that = this
      wx.saveFile({
        tempFilePath: this.data.tempFilePath,
        success: function (res) {
          that.setData({
            savedFilePath: res.savedFilePath
          })
          wx.setStorageSync('savedFilePath', res.savedFilePath)
          that.setData({
            dialog: {
              title: '保存成功',
              content: '下次进入应用时，此文件仍可用',
              hidden: false
            }
          })
        },
        fail: function (res) {
          that.setData({
            dialog: {
              title: '保存失败',
              content: '应该是有 bug 吧',
              hidden: false
            }
          })
        }
      })
    }
  },
  clear: function () {
    wx.setStorageSync('savedFilePath', '')
    this.setData({
      tempFilePath: '',
      savedFilePath: ''
    })
  },
  confirm: function () {
    this.setData({
      'dialog.hidden': true
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    console.log(this.data);
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo);
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  radioChange(e){
    var checked = e.detail.value
    
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i ++) {

      if (checked.indexOf(this.data.radioItems[i].id) !== -1) {

        changed['radioItems['+i+'].checked'] = true
      } else {
        changed['radioItems['+i+'].checked'] = false
      }
    }
    this.setData(changed)
  },
  onPullDownRefresh(){
    console.log('我正在刷新页面');
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1000)
  },
  onShareAppMessage(){
    return {
      title: '我分享的是打印项目(小程序)',
      path: 'pages/index/index'
    }
  },
  chooseFile: function(){
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
      }
    })
    // wx.downloadFile({
    //   url: 'http://example.com/somefile.pdf',
    //   success: function (res) {
    //     var filePath = res.tempFilePath
    //     wx.openDocument({
    //       filePath: filePath,
    //       success: function (res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   }
    // })
  },
  navigateTo: function () {
    wx.navigateTo({ url: './navigator' })
  },
  onclick(){
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success: function(res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function(res) {
    //     console.log(res.errMsg)
    //   }
    // })
    // wx.showNavigationBarLoading();
    // wx.chooseAddress({
    //   success: function (res) {
    //     console.log(res.userName)
    //     console.log(res.postalCode)
    //     console.log(res.provinceName)
    //     console.log(res.cityName)
    //     console.log(res.countyName)
    //     console.log(res.detailInfo)
    //     console.log(res.nationalCode)
    //     console.log(res.telNumber)
    //   }
    // })

    console.log('on click');
  }
})
