// pages/collect/collect.js
const app = getApp();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:new Array(),
    serverUrl:app.data.serverUrl
  },
  getCollectPostListInfo: function () {
    var url = this.data.serverUrl + "getCollectPostInfoList";
    wx.request({
      url: url,
      data: {
        openId: app.data.openId,
      },
      success: result => {
        var dataList = result.data.data;
        console.log(dataList);
        if (result.data.state == 1) {
          this.setData({
            dataList: dataList
          })
        } else {

        }
      },
      fail: function (e) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectPostListInfo();
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
  
  }, goToDetails: function (e) {
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
})