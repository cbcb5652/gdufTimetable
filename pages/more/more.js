//more.js
//获取应用实例
var app = getApp();
Page({
  data: {
    user: {},
    
  },
  onShow: function () {
    this.getData();
  },
  getData: function () {
    var _this = this;
    var days = ['一', '二', '三', '四', '五', '六', '日'];
    console.log(app.user)
    _this.setData({
      'user': app.user,
      
      'time': {
        'term': app._time.term,
        'week': app._time.week,
        'day': days[app._time.day - 1]
      },
      'is_bind': !!app.user.is_bind
    });
  }
});