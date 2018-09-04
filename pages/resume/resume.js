// pages/resume/resume.js
const app = getApp();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userPhone: "",
    userResume: "",
    userEmail: "",
    serverUrl:app.data.serverUrl
  },
  getUserName: function (e) {
    this.setData({
      userName: e.detail.value
    });
  },
  getUserPhone: function (e) {
    this.setData({
      userPhone: e.detail.value
    });
  },
  getUserEmail: function (e) {
    this.setData({
      userEmail: e.detail.value
    });
  },
  getUserResume: function (e) {
    this.setData({
      userResume: e.detail.value
    });
  },
  saveUserInfo: function () {
    if (!this.data.userName) {
      wx.showModal({
        title: '错误',
        content: '请输入正确的用户姓名',
        confirmColor: "green",
        showCancel: false
      })
      return;
    }

    if (!this.data.userPhone || this.data.userPhone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        confirmColor: "green",
        showCancel: false
      })
      return;
    }
    if(!this.data.userEmail){
      wx.showModal({
        title: '提示',
        content: '请输入邮箱',
        confirmColor: "green",
        showCancel: false
      })
      return;
    }
    if (this.data.userEmail.indexOf('@')<=0) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的邮箱格式',
        confirmColor: "green",
        showCancel: false
      })
      return;
    }
    var url = this.data.serverUrl + "updateUserInfo";
    wx.request({
      url: url,
      data: {
        userName: this.data.userName,
        userPhone: this.data.userPhone,
        userEmail: this.data.userEmail,
        userResume: this.data.userResume,
        openId: app.data.openId
      }, success: res => {
        if (res.data.state == 1) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.messsage,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfoByOpenId();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfoByOpenId(){
    var openId = app.data.openId;
    wx.request({
      url: this.data.serverUrl + 'getUserInfo',
      data: {
        openId: openId
      }, success: res => {
        if (res.data.length >= 1) {
          var userInfo = res.data[0];
          this.setData({
            userName: userInfo.Name,
            userPhone: userInfo.Mobile,
            userEmail: userInfo.Email,
            userResume: userInfo.Grjj,
          })
        } else { }
      }
    })
  }
})