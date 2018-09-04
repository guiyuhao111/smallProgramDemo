// index.js
//获取应用实例
const app = getApp();
const util = require("../../utils/util.js");
Page({
  data: {
    currentNav: 1,
    serverUrl: app.data.serverUrl,
    searchInputFontSize: "0%",
    searchTitle: "",
    dataList:new Array()
  },
  searchFocus:function(e){
      
  },
  searchBlur:function(e){
    
  },
  getSearchTitle: function(e) {
    this.setData({
      searchTitle: e.detail.value
    });
  },
  inputText: function() {
    this.setData({
      searchInputFontSize: "1rem",
      placeholderStyle: "none",
    })
  },
  lostFocus: function() {
    this.setData({
      searchInputFontSize: "0%",
      placeholderStyle: "inline",
    })
  },
  chooseWages: function(event) {
    var dataset = event.currentTarget.dataset;
    var current = dataset.current;
    this.setData({
      currentNav: current
    })
    this.getPostListInfo(current);
  },
  getPostListInfo: function (current) {
    var NxS = "";
    var NxE = "";
    /**
     * type1,type2是预留项
     */
    var type1 = "";
    var type2 = "";
    var gwmc = this.data.searchTitle;
    if (current == 1) {
      NxS = "0.1";
      NxE = "30";
    } else if (current == 2) {
      NxS = "30";
      NxE = "50";
    } else if (current == 3) {
      NxS = "50";
    } else if (current == 4) {

    }
    var url = this.data.serverUrl + "getPostInfoList";
    wx.request({
      url: url,
      data: {
        NxS: NxS,
        NxE: NxE,
        gwmc: gwmc,
        type1: type1,
        type2: type2
      },
      success: result=> {
        var dataList=result.data.data;
        if(result.data.state==1){
          this.setData({
            dataList:dataList
          })
        }else{

        }
      },
      fail: function(e) {

      }
    })
  },
  goToDetails:function(e){
    var dataset = e.currentTarget.dataset;
    var postId=dataset.postid;
    var txt=dataset.txt;
    var ltId=dataset.ltid;
    var date=dataset.date;
    var NxS=dataset.nxs;
    var NxE=dataset.nxe;
    var ltName=dataset.ltname;
    var gwzz = dataset.gwzz.replace(new RegExp("<br>", "g"), "\n\r \r ").replace(new RegExp("<br/>", "g"), "\n\r \r ");
    var rzzg = dataset.rzzg.replace(new RegExp("<br>", "g"), "\n\r \r ").replace(new RegExp("<br/>", "g"), "\n\r \r ");
    var current=this.data.currentNav;
    var url ="/pages/details/details?postId=[postId]&txt=[txt]&NxS=[NxS]&NxE=[NxE]&date=[date]&ltId=[ltId]&current=[current]&ltName=[ltName]&Gwzz=[Gwzz]&Rzzg=[Rzzg]";
    url = url.replace("[postId]", postId).replace("[txt]", txt).replace("[NxE]", NxE).replace("[date]", date).replace("[NxS]", NxS).replace("[ltId]", ltId).replace("[current]", current).replace("[ltName]", ltName).replace("[Gwzz]", gwzz).replace("[Rzzg]",rzzg);
    wx.navigateTo({
      url: url,
    })
  },
  searchPost:function(){
    this.getPostListInfo(this.data.currentNav);
  },
  onLoad: function() {
    this.getPostListInfo(this.data.currentNav);
  }
})