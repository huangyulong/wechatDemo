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
    console.log(e)
    if(e.detail) {
      this.setData({
        userInfo: JSON.parse(e.detail.rawData),
        welcome: '欢迎：' + JSON.parse(e.detail.rawData).nickName
      },function(){
        setTimeout(function(){
          wx.reLaunch({
            url: '../index/index'
          })
        }, 3000)
      })
    } 
  }
})