  //公共模态框组件
  /*
    依赖jquery ,advancedModal.css ,advancedModal.js（放到common中，提供url）
    使用方法 调用 modal.showPop({params})
    params 一个参数对象
     @params title 标题
     @params subtitle 副标题 也可以是一些打招呼信息
     @params content 正文内容
     @params btnGroup 按钮组对象
            a.普通提示弹窗  btnGroup:{
                              type:'alert',
                              closeText: '确定'
                            }
            b.带回调的确认窗 btnGroup:{
                                type: 'confirm',
                                confirmText: '就这么愉快地决定了',
                                confirmCallback: fn,
                                cancelText: '我再想想'
                             }   
              其中fn是自己定义的回调函数                          
    定义特殊样式，可以传递html形式的字符串,class自己定义，
    content定义了span标签样式（#f70，主打橙），供一般的高亮文字使用
  */
  var modalLay = function() {
    //存放callback函数
    callback: '';
  };
  modalLay.prototype = {
    init: function(options) {
      var template = '<div class="modal">';
      template += ' <div class="modal-lay"></div>';
      template += ' <div class="modal-body layer-body">';
      template += '   <div class="layer-title">';
      template += '     <span>' + options.title + '</span>';
      template += '     <span class="icon-bclose close-btn"></span>';
      template += '   </div>';
      template += '   <div class="layer-cont">';
      template += '     <div class="layer-subtitle">' + options.subtitle + '</div> ';
      template += '     <div>' + options.content + '</div>';
      template += '   </div>';
      template += '   <div class="layer-button">';
      if (options.btnGroup.type == 'confirm') {
        template += '     <a href="javascript:;" class="layer-btn confirm-btn">' + options.btnGroup.confirmText + '</a>';
        template += '     <a href="javascript:;" class="layer-btn close-btn">' + options.btnGroup.cancelText + '</a>';
      } else if (options.btnGroup.type == 'alert') {
        template += '     <a href="javascript:;" class="layer-btn confirm-btn close-btn">' + options.btnGroup.closeText + '</a>';
      };
      template += '   </div>';
      template += ' </div>';
      template += '</div>';
      $('body').append(template);
    },
    setPosition: function(shopPopWrap) {
      var iHeight, iWidth, hWindow, wWindow, _x, _y, tScroll, hScroll;
      var ele = $(shopPopWrap).children('.layer-body');
      iHeight = ele.outerHeight(true);
      iWidth = ele.outerWidth(true);
      hWindow = $(window).height();
      wWindow = $(window).width();
      tScroll = $(window).scrollTop();
      lScroll = $(window).scrollLeft();
      if (!this.isIE6) {
        _x = parseInt((wWindow - iWidth) / 2);
        _y = parseInt((hWindow - iHeight) / 2);
      } else {
        _x = parseInt((wWindow - iWidth) / 2 + lScroll);
        _y = parseInt((hWindow - iHeight) / 2 + tScroll);
      }
      ele.css({
        top: _y,
        left: _x
      });

    },
    showPop: function(params) {
      var _this = this;
      var shopPopWrap = '.modal';
      modal.init(params);
      if (params.btnGroup.type == 'confirm') {
        this.callback = params.btnGroup.confirmCallback;
      };

      $(shopPopWrap).show();
      this.setPosition(shopPopWrap);
      $(window).bind('scroll resize', function() {
        _this.setPosition(shopPopWrap);
      });
    },
    closePop: function(whatever) {
      var shopPopWrap = '.modal';
      $(shopPopWrap).remove();
      if (this.callback && typeof this.callback === 'function' && whatever) {
        this.callback();
      }
    },

  };

  var modal = new modalLay()
  //关闭按钮处理
  $(document).on('click', '.confirm-btn', function() {
    modal.closePop('whatever');

  });
  $(document).on('click', '.close-btn', function() {
    modal.closePop();

  });
