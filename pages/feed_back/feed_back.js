// pages/feed_back/feed_back.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: 'http://class.zzvlm.com/img3418@2x.png',
    img: '',
    cursor: 0,
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //上传图片
  up_img() {
    config.chooseImage((res) => {
      config.ajax('img', {
        token: wx.getStorageSync('user_token')
      }, '/user/upload_img', succes => {
        this.setData({
          img: 'http://yueke.dazhu-ltd.cn/public/uploads/' + succes.data.path
        })
      }, error => {
        console.log(error)
      }, complete => {
        console.log(complete)
      }, res.tempFilePaths[0])
    })
  },
  //获取文字
  get_text(e) {
    this.setData({
      cursor: e.detail.cursor,
      value: e.detail.value
    })
  },
  //提交反馈
  sure() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      content: this.data.value,
      img: [this.data.img]
    }, '/user/suggestion_feedback', res => {
      config.mytoast('反馈成功!', res => {
        setTimeout(() => {
          wx.navigateBack(-1)
        }, 1500)
      })
    })

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