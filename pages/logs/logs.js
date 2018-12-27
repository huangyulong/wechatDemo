//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: [],
    system: {},
    user: app.globalData.userInfo,
    location: {},
    marks: [],
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    this.getSystemInfo()
    this.getLocation()
  },
  onShow:function() {
    this.getLocation()
  },
  getSystemInfo:function() {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        let data = {
         brand: res.brand,
         model: res.model
        }
        that.setData({
          system: data
        })

      }
    })
  },
  getLocation: function() {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        that.setData({
          location: {latitude: latitude, longitude: longitude},
          marks: [
            {
              id: 'dot1', latitude: latitude, longitude: longitude, 
              iconPath: '/images/position2.png',width: 30,height: 30  
            }
          ]
        },function(){
          setTimeout(function () {
            that.setData({
              marks: [
                {
                  id: 'dot1', latitude: latitude - 0.01, longitude: longitude - 0.01,
                  iconPath: '/images/position2.png', width: 30, height: 30
                }
              ]
            })
          }, 3000)
        })
       
      }
    })
  }
})
