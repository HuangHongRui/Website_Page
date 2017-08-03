




function GoTop() {              //置顶
  this.createNode()
  this.bindEvent()
}
GoTop.prototype = {
  createNode : function() {
    this.target = $('<div class="goTop"></div>')
    $('body').append(this.target)
  },
  bindEvent : function() {
    var _this = this
    $(window).on('scroll',function() {
      var scrollTop = $(window).scrollTop()
      if(scrollTop > 500){
        _this.target.fadeIn(1000)
      } else {
        _this.target.fadeOut(500)
      }               
    })
    _this.target.click(function() {
      $('html, body').animate({
        scrollTop:0
      }, 'slow')
    })
  }
}
// new GoTop()
module.exports = GoTop;
