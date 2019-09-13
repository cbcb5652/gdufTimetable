//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js')
Page({
  data: {
    color: "#ff6f10",
    disabled: false,
    getCode: "当前时间",
    time:new Date,
    menu:null,
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    offline: false,
    remind: '加载中',
    cores: [
      [
        { id: 'kb', name: '课表查询', disabled: false, teacher_disabled: false, offline_disabled: false },
        { id: 'cj', name: '成绩查询', disabled: false, teacher_disabled: true, offline_disabled: false },
        { id: 'kjs', name: '空教室', disabled: false, teacher_disabled: false, offline_disabled: true },
        { id: 'xs', name: '学生查询', disabled: false, teacher_disabled: false, offline_disabled: true },
      ]
    ],
    card: {
      'kb': {
        show: false,
        time_list: [
          { begin: '8:00', end: '8:45' },
          { begin: '8:55', end: '9:40' },
          { begin: '10:05', end: '10:50' },
          { begin: '11:00', end: '11:45' },
          { begin: '14:00', end: '14:45' },
          { begin: '14:55', end: '15:40' },
          { begin: '16:05', end: '16:50' },
          { begin: '17:00', end: '17:45' },
          { begin: '19:00', end: '19:45' },
          { begin: '19:55', end: '20:40' },
          { begin: '20:50', end: '21:35' },
          { begin: '21:45', end: '22:30' }
        ],
        data: {}
      },
      'ykt': {
        show: false,
        data: {
          'last_time': '',
          'balance': 0,
          'cost_status': false,
          'today_cost': {
            value: [],
            total: 0
          }
        }
      },
      'jy': {
        show: false,
        data: {}
      },
      'sdf': {
        show: false,
        data: {
          'room': '',
          'record_time': '',
          'cost': 0,
          'spend': 0
        }
      }
    },
    user: {},
    disabledItemTap: false //点击了不可用的页面
  },
  
  
  
  //下拉更新
  onPullDownRefresh: function () {
    if (app._user.is_bind) {
      this.getCardData();
    } else {
      wx.stopPullDownRefresh();
    }
  },
  onShow: function () {
    var _this = this;
    
    //离线模式重新登录
    if (_this.data.offline) {
      _this.login();
      return false;
    }
    function isEmptyObject(obj) { for (var key in obj) { return false; } return true; }
    function isEqualObject(obj1, obj2) { if (JSON.stringify(obj1) != JSON.stringify(obj2)) { return false; } return true; }
    var l_user = _this.data.user,  //本页用户数据
      g_user = app._user; //全局用户数据
    //排除第一次加载页面的情况（全局用户数据未加载完整 或 本页用户数据与全局用户数据相等）
    if (isEmptyObject(l_user) || !g_user.openid || isEqualObject(l_user.we, g_user.we)) {
      return false;
    }
    //全局用户数据和本页用户数据不一致时，重新获取卡片数据
    if (!isEqualObject(l_user.we, g_user.we)) {
      //判断绑定状态
      if (!g_user.is_bind) {
        _this.setData({
          'remind': '未绑定'
        });
      } else {
        _this.setData({
          'remind': '加载中'
        });
        //清空数据
        _this.setData({
          user: app._user,
          'card.kb.show': false,
          'card.ykt.show': false,
          'card.jy.show': false,
          'card.sdf.show': false
        });
        _this.getCardData();
      }
    }
  },
  onLoad: function () {
    this.login();
    this.sendCode();
  },
  sendCode: function () {
    var that = this;
    var times = 0
    var i = setInterval(function () {
      var time = util.formatTime(new Date());
      that.setData({
        time:time
      })
    }, 1000)
  },
  login: function () {
    var _this = this;
    //如果有缓存，则提前加载缓存
    if (app.cache.version === app.version) {
      try {
        _this.response();
      } catch (e) {
        //报错则清除缓存
        app.cache = {};
        wx.clearStorage();
      }
    }
    //然后再尝试登录用户, 如果缓存更新将执行该回调函数
    app.getUser(function (status) {
      _this.response.call(_this, status);
    });
  },
  response: function (status) {
    var _this = this;
    if (status) {
      if (status != '离线缓存模式') {
        //错误
        _this.setData({
          'remind': status
        });
        return;
      } else {
        //离线缓存模式
        _this.setData({
          offline: true
        });
      }
    }
    _this.setData({
      user: app._user
    });
    //判断绑定状态
    if (!app._user.is_bind) {
      _this.setData({
        'remind': '未绑定'
      });
    } else {
      _this.setData({
        'remind': '加载中'
      });
      _this.getCardData();
    }
  },
  disabled_item: function (event) {
    var that = this
    console.log(event)
    var _this = this;
    switch(event.currentTarget.id){
      case 'kb': this.menu='kb';break;
      case 'cj':this.menu = 'cj';break;
      case 'kjs' :this.menu = 'kjs';break;
      case 'xs' :this.menu = 'xs';break;
      
    }
    this.jumpTo();
  },
  //跳转传入字符串的页面，对应主页菜单栏
  jumpTo:function(){
    console.log('../menu/' + this.menu + '/' + this.menu)
    var that = this
    
    wx.navigateTo({
      url: '../menu/' + this.menu + '/' + this.menu// 页面 A
    })
  },
  
});