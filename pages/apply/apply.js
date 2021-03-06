// pages/apply/apply.js
const app = getApp();
const util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName: "",
    userPhone: "",
    userResume: "",
    userEmail: "",
    postName: "",
    headhuntingName: "",
    headImg: app.data.serverUrl + "head.jpg",
    urlMap: new Map(),
  },
  getUserName: function(e) {
    this.setData({
      userName: e.detail.value
    });
  },
  getUserPhone: function(e) {
    this.setData({
      userPhone: e.detail.value
    });
  },
  getUserEmail: function(e) {
    this.setData({
      userEmail: e.detail.value
    });
  },
  getUserResume: function(e) {
    this.setData({
      userResume: e.detail.value
    });
  },
  //事件处理函数
  sendUserApplyInfo: function(event) {
    //发送用户的申请信息...
    //此处向服务器发送请求信息
    //拦截用户请求
    if (!this.data.userName) {
      wx.showModal({
        title: '错误',
        content: '请输入正确的用户姓名',
        confirmColor: "green"
      })
      return;
    }

    if (!this.data.userPhone || this.data.userPhone.length != 11) {
      wx.showModal({
        title: '错误',
        content: '请输入正确的手机号',
        confirmColor: "green"
      })
      return;
    }
    wx.request({
      url: app.data.serverUrl + "addUserApplyInfo",
      data: {
        userName: this.data.userName,
        userPhone: this.data.userPhone,
        userEmail: this.data.userEmail,
        userResume: this.data.userResume,
        postId: this.data.urlMap.get("postId"),
        postName: this.data.urlMap.get("postName"),
        headhuntingName: this.data.urlMap.get("headhuntingName"),
        openId: app.data.openId
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res.data.state == 1) {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.message,
            confirmColor: "red"
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxcf4e5483d69c4cfb&secret=65579fc25a2283be7842b5b23c09ee56&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            //返回openid
            var openid = res.data.openid;
            wx.request({
              url: app.data.serverUrl + "getUserInfo",
              data: {
                openId: openid
              },
              success: res => {
                if (res.data.length >= 1) {
                  var userInfo = res.data[0];
                  this.setData({
                    userName: userInfo.Name,
                    userPhone: userInfo.Mobile,
                    userEmail: userInfo.Email,
                    userResume: userInfo.Grjj
                  })
                } else {}
              }
            })
          }
        })
      }
    })
    var url = util.getCurrentPageUrlWithArgs();
    url = "pages/apply/apply?postId=2&postName=软件研发&headhuntingName=桂预豪";
    //此处设置的本地测试的url
    if (url.indexOf("?") > 0) {
      this.data.urlMap = util.getUrlParamToMap(url);
      this.setData({
        postName: this.data.urlMap.get("postName"),
        headhuntingName: this.data.urlMap.get("headhuntingName")
      })
    } else {
      wx.showModal({
        title: '提示',
        content: "未知的请求",
        confirmColor: "green"
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    /**
     * 根据openId获取用户信息
     */

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})