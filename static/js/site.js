seajs.use(['$', 'arale/popup/0.9.9/popup'], function($, Popup) {
  $(function(){
    $('h4 em, h3 em, h3 code, h4 code').parent().addClass('doc-api')
    // 给 iframe 加链接
    $('.nico-iframe').each(function(i, item) {
      var src = $(item).find('iframe').attr('src')
      var html = '<a class="new-window" target="_blank" href="' + src + '">新窗口打开</a>'
      $(item).append(html)
    });
    // 给 code 加收起和展开
    $('.highlight').each(function(i, item) {
      var $item = $(item)
      if ($item.height() > 400) {
        $item.append('<a class="code-toggle" href="#">展开</a>')
        $item.addClass('collapse')
      }
    });
  });
  $('.highlight').on('click', '.code-toggle', function() {
    var pre = $(this).parents('.highlight')
    if (pre.hasClass('collapse')) {
      pre.removeClass('collapse')
      $(this).text('收起')
    } else {
      pre.addClass('collapse')
      $(this).text('展开')
    }
    return false
  });

  // spm install message
  var root = $('#sidebar-wrapper h1 sup a').html();
  var name = $('#sidebar-wrapper h1 > a').html().toLowerCase();
  var version = $('#sidebar-wrapper .version span').html();
  new Popup({
    trigger: '#sidebar-wrapper > h1',
    template: '<div class="popup-install">spm install '
        +root+'.'+name+'@'+version+'</div>',
    align: {
        baseXY: [0, '100%+5']
    }
  });
})
