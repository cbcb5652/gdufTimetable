//app.js
App({
  username:null,
  token:null,
  version: 'v0.1.2', //版本号
  onLaunch: function() {
    var _this = this;
    //读取缓存
    try {
      var data = wx.getStorageInfoSync();
      if (data && data.keys.length) {
        data.keys.forEach(function(key) {
          var value = wx.getStorageSync(key);
          if (value) {
            _this.cache[key] = value;
          }
        });
        if (_this.cache.version !== _this.version) {
          _this.cache = {};
          wx.clearStorage();
        } else {
          _this.user.wx = _this.cache.userinfo.userInfo || {};
          _this.processData(_this.cache.userdata);
        }
      }
    } catch (e) {
      console.warn('获取缓存失败');
    }
  },
  //保存缓存
  saveCache: function(key, value) {
    if (!key || !value) {
      return;
    }
    var _this = this;
    _this.cache[key] = value;
    wx.setStorage({
      key: key,
      data: value
    });
  },
  //清除缓存
  removeCache: function(key) {
    if (!key) {
      return;
    }
    var _this = this;
    _this.cache[key] = '';
    wx.removeStorage({
      key: key
    });
  },
  //后台切换至前台时
  onShow: function() {

  },
  //判断是否有登录信息，让分享时自动登录
  loginLoad: function(onLoad) {
    var _this = this;
    if (!_this._t) { //无登录信息
      _this.getUser(function(e) {
        typeof onLoad == "function" && onLoad(e);
      });
    } else { //有登录信息
      typeof onLoad == "function" && onLoad();
    }
  },
  //getUser函数，在index中调用
  getUser: function(response) {
    var _this = this;
    wx.showNavigationBarLoading();
    wx.login({
      success: function(res) {
        if (res.code) {
          //调用函数获取微信用户信息
          _this.getUserInfo(function(info) {
            _this.saveCache('userinfo', info);
            _this.user.wx = info.userInfo;
            if (!info.encryptedData || !info.iv) {
              _this.g_status = '无关联AppID';
              typeof response == "function" && response(_this.g_status);
              return;
            }

          });
        }
      }
    });
  },
  processData: function(key) {
   console.log(key)
   var that = this;
    that.user.bj = key.data.bj.substring(key.data.bj.length - 2, key.data.bj.length - 1);
   that.user.rx=key.data.dqszj.substring(2,4);
   that.user.xb = key.data.xb;
   that.user.xm = key.data.xm;
   that.user.yxmc = key.data.yxmc.substring(0,key.data.yxmc.length-2);
    that.user.zymc = key.data.zymc;
    that.user.ksh = key.data.ksh;
    that.user.name = key.data.xm;
  },
  getUserInfo: function(cb) {
    var _this = this;
    //获取微信用户信息
    wx.getUserInfo({
      success: function(res) {
        typeof cb == "function" && cb(res);
      },
      fail: function(res) {
        _this.showErrorModal('拒绝授权将导致无法关联学校帐号并影响使用，请重新打开We重邮再点击允许授权！', '授权失败');
        _this.g_status = '未授权';
      }
    });
  },
  //完善信息
  appendInfo: function(data) {
    var _this = this;
    _this.cache = {};
    wx.clearStorage();
    _this.user.we.build = data.build || '';
    _this.user.we.room = data.room || '';
  },
  showErrorModal: function(content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function(title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      mask: true,
      duration: duration || 10000
    });
  },
  util: require('./utils/util'),
  key: function(data) {
    return this.util.key(data)
  },
  enCodeBase64: function(data) {
    return this.util.base64.encode(data)
  },
  cache: {},
  _server: 'https://we.cqu.pt',
  user: {
    //微信数据
    wx: {},
    //学生\老师数据
    we: {}
  },
  _time: {} //当前学期周数
});