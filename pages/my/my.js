// pages/my/my.js
const config=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    teacher:[]
  },
  call(){
    config.mytoast('点此打电话')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取个人信息
  get_userInfo(){
    config.ajax('POST',{
      token:''
    },'/user/user_info',res=>{
      this.setData({
        userInfo:res.data.data
      })
    })
  },
  //我的老师
  get_myteacher(){
    config.ajax('POST', {
      token: ''
    }, '/user/my_teacher', res => {
      this.setData({
        teacher: res.data.data
      })
    })
  },
  //全部订单
  
  to_myteacher(){
    wx.navigateTo({
      url: '/pages/my/my_teacher/my_teacher',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  to_feed_back(){
    wx.navigateTo({
      url: '/pages/feed_back/feed_back',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_my_details(){
    wx.navigateTo({
      url: '/pages/my/my_details/my_details',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_about_us(){
    wx.navigateTo({
      url: '/pages/my/about_us/about_us',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_ordel(){
    wx.switchTab({
      url: '/pages/ordel/ordel',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
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