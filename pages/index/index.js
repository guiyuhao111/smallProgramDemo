//index.js
//获取应用实例
const app = getApp();
const util = require("../../utils/util.js");
Page({
  data: {
    currentNav:"",
    serverUrl:app.data.serverUrl,
    searchInputFontSize:"0%",
    placeholderStyle:"inline",
  },
  inputText:function(){
    this.setData({
      searchInputFontSize:"1rem",
      placeholderStyle:"none",
    })
    console.log(11)
  },
  lostFocus:function(){
    this.setData({
      searchInputFontSize: "0%",
      placeholderStyle: "inline",
    })
  },
  chooseWages:function(event){
    var dataset = event.currentTarget.dataset;
    var current=dataset.current;
    this.setData({
      currentNav:current
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      // wx.redirectTo({
      //   url: '/demo',
      // })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})