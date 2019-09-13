// pages/subject/subject.js
var app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    
    sj: ['一', '二', '三', '四', '五', '六', '日'],
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
      //上课长度全部默认为两节课
      { "xqj": 1, "sksj": 1, "skcd": 2, "kcxx": "" },
      { "xqj": 1, "sksj": 3, "skcd": 2, "kcxx": "" },
      { "xqj": 1, "sksj": 6, "skcd": 2, "kcxx": "" },
      { "xqj": 1, "sksj": 8, "skcd": 2, "kcxx": "" },
      { "xqj": 1, "sksj": 10, "skcd": 2, "kcxx": "" },
      { "xqj": 1, "sksj": 12, "skcd": 2, "kcxx": "" },
      { "xqj": 2, "sksj": 1, "skcd": 2, "kcxx": "" },
      { "xqj": 2, "sksj": 3, "skcd": 2, "kcxx": "" },
      { "xqj": 2, "sksj": 6, "skcd": 2, "kcxx": "" },
      { "xqj": 2, "sksj": 8, "skcd": 2, "kcxx": "" },
      { "xqj": 2, "sksj": 10, "skcd": 2, "kcxx": "" },
      { "xqj": 2, "sksj": 12, "skcd": 2, "kcxx": "" },
      { "xqj": 3, "sksj": 1, "skcd": 2, "kcxx": "" },
      { "xqj": 3, "sksj": 3, "skcd": 2, "kcxx": "" },
      { "xqj": 3, "sksj": 6, "skcd": 2, "kcxx": "" },
      { "xqj": 3, "sksj": 8, "skcd": 2, "kcxx": "" },
      { "xqj": 3, "sksj": 10, "skcd": 2, "kcxx": "" },
      { "xqj": 3, "sksj": 12, "skcd": 2, "kcxx": "" },
      { "xqj": 4, "sksj": 1, "skcd": 2, "kcxx": "" },
      { "xqj": 4, "sksj": 3, "skcd": 2, "kcxx": "" },
      { "xqj": 4, "sksj": 6, "skcd": 2, "kcxx": "" },
      { "xqj": 4, "sksj": 8, "skcd": 2, "kcxx": "" },
      { "xqj": 4, "sksj": 10, "skcd": 2, "kcxx": "" },
      { "xqj": 4, "sksj": 12, "skcd": 2, "kcxx": "" },
      { "xqj": 5, "sksj": 1, "skcd": 2, "kcxx": "" },
      { "xqj": 5, "sksj": 3, "skcd": 2, "kcxx": "" },
      { "xqj": 5, "sksj": 6, "skcd": 2, "kcxx": "" },
      { "xqj": 5, "sksj": 8, "skcd": 2, "kcxx": "" },
      { "xqj": 5, "sksj": 10, "skcd": 2, "kcxx": "" },
      { "xqj": 5, "sksj": 12, "skcd": 2, "kcxx": "" },
      { "xqj": 6, "sksj": 1, "skcd": 2, "kcxx": "" },
      { "xqj": 6, "sksj": 3, "skcd": 2, "kcxx": "" },
      { "xqj": 6, "sksj": 6, "skcd": 2, "kcxx": "" },
      { "xqj": 6, "sksj": 8, "skcd": 2, "kcxx": "" },
      { "xqj": 6, "sksj": 10, "skcd": 2, "kcxx": "" },
      { "xqj": 6, "sksj": 12, "skcd": 2, "kcxx": " " },
      { "xqj": 7, "sksj": 1, "skcd": 2, "kcxx": " " },
      { "xqj": 7, "sksj": 3, "skcd": 2, "kcxx": " " },
      { "xqj": 7, "sksj": 6, "skcd": 2, "kcxx": " " },
      { "xqj": 7, "sksj": 8, "skcd": 2, "kcxx": "  " },
      { "xqj": 7, "sksj": 10, "skcd": 2, "kcxx": "" },
      { "xqj": 7, "sksj": 12, "skcd": 2, "kcxx": " " }
    ]
  },
  showCardView: function (e) {
    wx.navigateTo({
      url: '../set/set?id=' + e.currentTarget.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // var skcd = wx.getStorageSync('skcd');
    // this.setData({ kcxx: kcxx });
    
    wx.getStorage({
      key: 'token',
      success: function(res) {
      
       that.setData({
         token:res.data
       })
      },
    })
    var that = this;
    console.log(app.token)
    
   wx.request({
     url: 'http://jwxt.gduf.edu.cn/app.do?method=getKbcxAzc&xh='+app.username+'&zc=2',
     
     header:{
       'token': app.token
     },
     success: function (res) {
      //  console.log(res)
       for (var index in res.data) {
        
         var xqj = res.data[index].kcsj.substring(0,1)
         var kssj = parseInt( res.data[index].kcsj.substring(1,3));
         var jssj = parseInt(res.data[index].kcsj.substring(3, 5));
         var dd = res.data[index].jsmc;
         var kc = res.data[index].kcmc;
         var sj = res.data[index].kkzc;
         if (kc.length >= 9) {
           console.log("进来了？")
           kc = kc.substring(0, 7);
           kc = kc + "...";
         }
         var all = kc+'\n'+sj;

         
        
         for(var index in that.data.wlist){
           var xq = that.data.wlist[index].xqj;
           var ks = that.data.wlist[index].sksj;
          if(kssj==9||kssj==11){
            kssj +=1;
          }
           if(xq==xqj&&kssj==ks){
             var sz = 'wlist['+index+'].kcxx'
               that.setData({
                 [sz]: all
               })
             
           }
           
         }
       }
      
     }
     

   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var that = this;
    // for (var index in that.data.wlist) {
    //   console.log(that.data.wlist)
    // }
    // that.onShow();
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

  }
})
