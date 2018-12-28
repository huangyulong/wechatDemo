const app = getApp()
Page({
  data: {
    title: '这是用来测试viewScroll',
    videos: [],
    height: app.globalData.systemInfo.windowHeight
  },
  onLoad: function(){
    this.getVideos()
  },
  getVideos: function () {
    let that = this
    wx.request({
      url: 'https://api.apiopen.top/videoCategoryDetails?id=32',
      method: 'GET',
      success: function(res) {
        let data = res.data.result
        let video = []
        data.forEach((item) => {
          video.push({
            title: item.data.content.data.title,
            playUrl: item.data.content.data.playUrl,
            description: item.data.content.data.description,
            coverUrl: item.data.content.data.cover.feed
          })
        })
        that.setData({
          videos: video
        })
      }
    })
  }
})