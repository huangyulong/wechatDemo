let app = getApp()
Page({
  data: {
    data: {}
  },
  onLoad(){
    let that = this
    this.setData({
      data: app.globalData.detailData
    })
  }
})