//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    isActive: '1',
    list: [],
    imageList: [],
    weatherList: [],
    currentPage: 2,
    showPreBtn: false,
    showNextBtn: true,
    showLoading: false,
    fixed: 'fixTop',
    swipers: [
      '../../images/car2.jpg', 
      '../../images/car3.jpg', '../../images/car4.jpg',  '../../images/car5.png',
    ]
  },
  onLoad: function () {
    this.getNewsData()
  },
  onReachBottom: function() {
    this.setData({
      showLoading: true
    })
    this.next()
    console.log('到底啦')
  },
  goViewTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },
  goDetail(e) {
    let data = e.currentTarget.dataset.detail
    app.globalData.detailData = data
    wx.navigateTo({
      url: '../../pages/newsDetail/detail',
    })

  },
  changeSelect: function(e) {
    let that = this
    let tab = e.currentTarget.dataset.type
    if(tab !== this.data.isActive) {
      this.setData({
        isActive: tab,
        currentPage: 2,
        showPreBtn: false,
        showNextBtn: true,
      })
      if (tab === '1') {
        this.setData({
          list: []
        }, function(){
          that.getNewsData()
        })
      } else if (tab === '2'){
        this.getImageList()
      } else if (tab === '3') {
        this.setData({
          list: []
        },function(){
          that.getDuanziData()
        })
      } else if (tab === '4') {
        this.getWeatherData()
      }
    }
    
  },
  pre: function () {
    let that = this;
    let current = this.data.currentPage;
    if(current === 2) {
      this.setData({
        showPreBtn: false,
      })
    } else {
      current--;
      this.setData({
        showPreBtn: true,
        showNextBtn: true,
        currentPage: current
      }, function(){
        if (that.data.isActive === '1') {
          that.getNewsData()
        } else if (that.data.isActive === '2') {
          that.getImageList()
        } else if (that.data.isActive === '3') {
          that.getDuanziData()
        } else if (that.data.isActive === '4') {
          that.getWeatherData()
        }
      })
    }
  },
  next: function () {
    let that = this;
    let current = this.data.currentPage;
    if (current === 10) {
      this.setData({
        showNextBtn: false
      })
    } else {
      current++;
      this.setData({
        showNextBtn: true,
        showPreBtn: true,
        currentPage: current
      }, function () {
        if (that.data.isActive === '1') {
          that.getNewsData()
        } else if (that.data.isActive === '2') {
          that.getImageList()
        } else if (that.data.isActive === '3') {
          that.getDuanziData()
        } else if (that.data.isActive === '4') {
          that.getWeatherData()
        }
      })
    }
  },
  getImageList: function () {
    let that = this;
    wx.request({
      url: 'https://www.apiopen.top/meituApi',
      method: 'GET',
      data: {
        page: that.data.currentPage
      },
      success: function(res) {
        let data = (that.data.imageList).concat(res.data.data)
        that.setData({
          imageList: data,
          showLoading: false
        })
      }
    })
  },
  // https://www.apiopen.top/journalismApi
  getNewsData: function() {
    let that = this
    wx.request({
      url: 'https://www.apiopen.top/journalismApi',
      method: 'GET',
      success(res) {
        that.setData({
          list: res.data.data.auto
        })
      }
    })
  },
  getDuanziData: function() {
    let that = this
    wx.request({
      url: 'https://www.apiopen.top/satinApi',
      method: 'GET',
      data: {
        type: '1',
        page: that.data.currentPage
      },
      success(res) {
        let data = (that.data.list).concat(res.data.data)
        that.setData({
          list: data,
          showLoading: false
        })
      }
    })
  },
  getWeatherData: function () {
    let that = this
    wx.request({
      url: 'https://www.apiopen.top/weatherApi',
      method: 'GET',
      data: {
        city: '北京'
      },
      success(res) {
        that.setData({
          weatherList: res.data.data.forecast
        })
      }
    })
  }
})
