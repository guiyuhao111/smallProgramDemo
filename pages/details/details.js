// pages/details/details.js
const app = getApp();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: app.data.serverUrl,
    pictureUrl: app.data.pictureUrl,
    floatWrapDisplay: "none",
    txt: "",
    NxS: "",
    NxE: "",
    date: "",
    ltName: "",
    currentNav: "",
    postId: 0,
    ltId: "",
    ltPic: "",
    gwzz: "",
    rzzg: "",
    ltIntroduce: "",
    ltPicPath: "",
    recommendPostInfoList: new Array(),
    userName: "",
    userPhone: "",
    userEmail: "",
    userResume: "",
    ltTel: "",
    hasCollectThisJob:false,
    collectPic:"/image/sc2.png"
  },
  makePhone: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.ltTel,
    })
  },
  showMorePost: function() {
    wx.navigateBack({

    })
  },
  comfirm: function() {

    if (!this.data.userName) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的用户姓名',
        confirmColor: "red",
        showCancel: false
      })
      return;
    }

    if (!this.data.userPhone || this.data.userPhone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        confirmColor: "red",
        showCancel: false
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
        postId: this.data.postId,
        postName: this.data.txt,
        headhuntingName: this.data.ltName,
        openId: app.data.openId
      },
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        if (res.data.state == 1) {
          this.setData({
            floatWrapDisplay: "none"
          })
          //成功
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        } else {
          //失败
          wx.showModal({
            title: '提示',
            content: res.data.message,
            confirmColor: "red",
            showCancel: false
          })
        }
      }
    })
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
  openFloatSwrap: function() {
    //根据openId查询用户信息
    var openId = app.data.openId;
    var url = this.data.serverUrl + "getUserInfo";
    wx.request({
      url: url,
      data: {
        openId: openId
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
    this.setData({
      floatWrapDisplay: "block"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = util.getCurrentPageUrlWithArgs();
    var paramsMap = util.getUrlParamToMap(url);
    //根据岗位Id去后端查询对应的岗位信息
    this.setData({
      postId: paramsMap.get("postId"),
      txt: paramsMap.get("txt"),
      NxS: paramsMap.get("NxS"),
      NxE: paramsMap.get("NxE"),
      date: paramsMap.get("date"),
      ltId: paramsMap.get("ltId"),
      currentNav: paramsMap.get("current"),
      ltName: paramsMap.get("ltName"),
      gwzz: paramsMap.get("Gwzz"),
      rzzg: paramsMap.get("Rzzg")
    })
    //根据ltId查询猎头相关信息
    this.getHeadhuntingInfoById();
    this.getRecommendPostInfoList();
    this.hasUserCollectThisPost();
  },
  hasUserCollectThisPost:function(){
    wx.request({
      url: app.data.serverUrl +"hasUserCollectThisPost",
      data:{
        openId:app.data.openId,
        postId:this.data.postId
      },success:res=>{
        if(res.data.data==1){
          this.setData({
            hasCollectThisJob:true,
            collectPic:"/image/sc1.png"
          })
        }else{
          this.setData({
            collectPic: "/image/sc2.png",
            hasCollectThisJob:false
          })
        }
      }
    })
  },
  getHeadhuntingInfoById:function(){
    wx.request({
      url: this.data.serverUrl + 'getHeadhuntingInfoById',
      data: {
        id: this.data.ltId
      },
      success: res => {
        var ltInfo = res.data.data;
        this.setData({
          ltIntroduce: ltInfo.Jj,
          ltPicPath: ltInfo.PicPath,
          ltTel: ltInfo.Tel
        })
      }
    })
  },
  getRecommendPostInfoList:function(){
    wx.request({
      url: this.data.serverUrl + 'getRecommendPostInfoList',
      data: {
        id: this.data.postId
      },
      success: res => {
        var dataList = res.data.data;
        this.setData({
          recommendPostInfoList: dataList
        })
      }
    })
  },
  goToDetails: function(e) {
    var dataset = e.currentTarget.dataset;
    var postId = dataset.postid;
    var txt = dataset.txt;
    var ltId = dataset.ltid;
    var date = dataset.date;
    var NxS = dataset.nxs;
    var NxE = dataset.nxe;
    var ltName = dataset.ltname;
    var gwzz = dataset.gwzz.replace(new RegExp("<br>", "g"), "\n\r \r ").replace(new RegExp("<br/>", "g"), "\n\r \r ");
    var rzzg = dataset.rzzg.replace(new RegExp("<br>", "g"), "\n\r \r ").replace(new RegExp("<br/>", "g"), "\n\r \r ");
    var current = this.data.currentNav;
    var url = "/pages/details/details?postId=[postId]&txt=[txt]&NxS=[NxS]&NxE=[NxE]&date=[date]&ltId=[ltId]&current=[current]&ltName=[ltName]&Gwzz=[Gwzz]&Rzzg=[Rzzg]";
    url = url.replace("[postId]", postId).replace("[txt]", txt).replace("[NxE]", NxE).replace("[date]", date).replace("[NxS]", NxS).replace("[ltId]", ltId).replace("[current]", current).replace("[ltName]", ltName).replace("[Gwzz]", gwzz).replace("[Rzzg]", rzzg);
    wx.navigateTo({
      url: url,
    })
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

  },
  closeFloatWrap: function() {
    this.setData({
      floatWrapDisplay: "none"
    })
  },
  collectThisJob: function() {
    wx.request({
      url: app.data.serverUrl + "collectThisJob",
      data: {
        postId: this.data.postId,
        openId: app.data.openId,
        state: this.data.hasCollectThisJob
      },
      success: res => {
        if (res.data.state == 1) {
          var title="收藏成功";
          var hasCollectThisJob = this.data.hasCollectThisJob;
          var collectPic = hasCollectThisJob ? "/image/sc2.png" :"/image/sc1.png";
          //如果之前已经收藏了则取消收藏
          if (hasCollectThisJob){
            title="取消成功";
          }
          wx.showToast({
            title: title,
            icon: 'success',
            duration: 1000,
            mask: true
          })
          this.setData({
            collectPic: collectPic,
            hasCollectThisJob: !hasCollectThisJob
          })
        } else {
          //失败
          wx.showModal({
            title: '提示',
            content: res.data.message,
            confirmColor: "red",
            showCancel: false
          })
        }
      }
    })
  }
})