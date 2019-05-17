Page({

  /**
   * 页面的初始数据
   */
  data: {
    input:'',
    leftCount: 0,
    filter:1,
    allCompleted: false,
    todos:[
      { value: '晨跑打卡 滴～～', completed: false},
      { value: '按时上班💼', completed: true},
      { value: '谁个午觉好吧👌', completed: false},
      {  value: '下班回家溜溜溜', completed: false}
    ],
    status: '1',
    curLists:[],
    showTodo:[]
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    this.setData({
      showTodo: this.data.todos
    })
  },
  save: function () {
    wx.setStorageSync('todo_list', this.data.todos)
  },

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    var todos = this.data.todos
    todos.push({ value: this.data.input, completed: false })
    this.setData({
      input: '',
      showTodo: todos,
      leftCount: this.data.leftCount + 1,
    })
    this.save();
  },
  
  toggleTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
    })
    this.save()
  },

  removeTodo: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    var remove = todos.splice(index, 1)[0]
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
    })
    this.save()
  },

  toggleAllHandle: function (e) {
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
    }
    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length,
    })
    this.save()
  },

  clearCompletedHandle: function (e) {
    var todos = this.data.todos
    var remains = []
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed || remains.push(todos[i])
    }

    this.setData({ todos: remains })
    this.save()
  },
  showStatus: function (e) {
    var st = e.currentTarget.dataset.status
    if (this.data.status === st) return
    if (st === '') {
      this.setData({
        status: st,
        curLists: this.data.lists
      })
      return
    }
    this.setData({
      status: st,
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