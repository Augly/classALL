// pages/income/income.js
const config=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_init()
  },
  get_init(){
    config.ajax('POST',{
      token:wx.getStorageSync('user_token'),
      page:this.data.page
    },'/user/balance_detail',res=>{
      console.log(res)
      this.setData({
        list:res.data.data.map((item)=>{
          item.user_balance_createtime = config.timeForm(item.user_balance_createtime).btTime
          return item
        })
      })
    })
  },
  list_detail(){
    wx.navigateTo({
      url: '/pages/income_details/income_details',
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