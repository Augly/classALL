// pages/my/my_details/my_details.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    birthday: '',
    sex_index: 0,
    age_index: 0,
    age_list: [],
    sex_list: [{
      label: '男',
      value: 1
    }, {
      label: '女',
      value: 2
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_userInfo()
    var s = []
    for (let n = 0; n < 100; n++) {
      s.push({
        label: n + '岁',
        value: n
      })
    }
    this.setData({
      age_list: s
    })
  },
  //选择性别
  bindchange(e) {
    console.log(e)
    this.setData({
      sex_index: e.detail.value
    })
  },
  //选择生日
  bindageChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  //获取个人信息
  get_userInfo() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/user_info', res => {
      wx.setStorageSync('userInfo', res.data.data)
      this.setData({
        birthday: res.data.data.user_birthday,
        userInfo: res.data.data
      })
    })
  },
  user_val() {
    config.chooseImage(res => {
      config.ajax('img', {
        token: wx.getStorageSync('user_token')
      }, '/user/upload_img', succes => {
        var userInfo = this.data.userInfo
        userInfo.user_portrait = succes.data.path
        console.log()
        this.setData({
          userInfo: userInfo,
          sex_index: userInfo.user_sex - 1,
        })
      }, error => {
        console.log(error)
      }, complete => {
        console.log(complete)
      }, res.tempFilePaths[0])
    })
  },
  userName(e) {
    var userInfo = this.data.userInfo
    userInfo.user_nickname = e.detail.value
    this.setData({
      userInfo: userInfo
    })
  },
  bindadder(e) {
    var userInfo = this.data.userInfo
    userInfo.user_address = e.detail.value
    this.setData({
      userInfo: userInfo
    })
  },
  //保存个人信息
  save() {
    config.ajax('POST', {
      nickname: this.data.userInfo.user_nickname,
      sex: this.data.sex_list[this.data.sex_index].value,
      birthday: this.data.birthday,
      address: this.data.userInfo.user_address,
      portrait: this.data.userInfo.user_portrait,
      token: wx.getStorageSync('user_token')
    }, '/user/user_info_update', res => {
      this.get_userInfo()
      config.mytoast('修改成功!即将返回', res => {
        setTimeout((res) => {
          wx.navigateBack(-1)
        }, 1000)
      })
    })
  },
  out() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/login_out', res => {
      wx.clearStorage()
      wx.reLaunch({
        url: '/pages/login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    })
  },
  bind_phone() {
    wx.navigateTo({
      url: '/pages/bind_phone/bind_phone',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_adder() {
    wx.navigateTo({
      url: '/pages/my/my_adder/my_adder',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
    return config.shareData

  }
})