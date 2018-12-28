var app = getApp()
Page({
  data: {
    welcome: '请登录',
    userInfo: {
      nickName: '',
      province: '',
      avatarUrl: '',
    }
  },
  onLoad: function () {
   
  },
  getUserInfo: function(e) {
    let that = this
    if(e.detail) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        welcome: '欢迎：' + e.detail.userInfo.nickName
      },function(){
        setTimeout(function(){
          wx.reLaunch({
            url: '../index/index'
          })
        }, 500)
      })
    } 
  }
})