//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    token: null,
    username: null,
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0
  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  bind: function (event) {
    var that = this;
   
    console.log("学号：" + that.data.userid);
    console.log("密码" + that.data.passwd);
    app.username = that.data.userid;
    wx.request({
      method: 'GET',
      url: 'http://jwxt.gduf.edu.cn/app.do?method=authUser&xh=' + that.data.userid + '&pwd=' + that.data.passwd,
      success: function (res) {
        
        if(res.data.flag==1){
         
          if(res.data.flag==1){
            app.user.is_bind = true;
            //获取对应学号信息
            console.log("token:" + res.data.token),
              app.token = res.data.token;
            wx.request({
              url: 'http://jwxt.gduf.edu.cn/app.do?method=getUserInfo&xh='+that.data.userid,
              method: 'GET',
              header:{
                'content-type':'application/json',
                'token': res.data.token
              },
              success: function (res) {
                app.processData(res);
                wx.switchTab({
                  url: 'more',
                })
              }
            })
            wx.showToast({
              title: '绑定成功',
            }, 2000)
            
           
          }
          
        }else{
          wx.showLoading({
            title: '学号/密码错误',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
         

        }
      }
    })
  },
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 9) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  }
});