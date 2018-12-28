//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: [],
    system: {
      brand: app.globalData.systemInfo.brand,
      model: app.globalData.systemInfo.model
    },
    user: {},
    location: {},
    marks: [],
    polylines: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      user: app.globalData.userInfo 
    })
    this.getLocation()
  },
  onShow:function() {
    this.getLocation()
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
              zIndex: 20,
              iconPath: '/images/position2.png',width: 30,height: 30,
              callout: { display: 'ALWAYS', content: '当前位置', color: '#fff', 
                fontSize: 16, borderRadius: 10, borderWidth: 2, bgColor: '#248901', padding: 5}
            }
          ],
          polylines: [
            {
              points: [{ latitude: latitude, longitude: longitude }, { latitude: latitude - 0.001, longitude: longitude },
                { latitude: latitude - 0.002, longitude: longitude }, { latitude: latitude, longitude: longitude - 0.001 },
                { latitude: latitude, longitude: longitude - 0.002 }],
              color: '#031e3b',
              width: 4,
              borderWidth: 2,
              borerColor: '#000000',
              dottedLine: true
            }
          ]  
        },function(){
          // setTimeout(function () {
          //   that.setData({
          //     marks: [
          //       {
          //         id: 'dot1', latitude: latitude - 0.01, longitude: longitude - 0.01,
          //         iconPath: '/images/position2.png', width: 30, height: 30
          //       }
          //     ]
          //   })
          // }, 3000)
        })
       
      }
    })
  }
})
