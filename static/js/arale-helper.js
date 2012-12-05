;(function() {
  var CDN_MODULES = [
    'jquery', 'zepto', 'json', 'jasmine', 'underscore', 'handlebars',
    'seajs', 'moment', 'async', 'store', 'swfobject', 'backbone', 'raphael'
  ]

  var ALIPAY_BASE = 'http://static.alipayobjects.com/'
  var ARALE_BASE = 'http://aralejs.org/source/'
  var PACKAGE = {}

  var mapRules = []
  mapRules.push(function(url) {

    // CDN_MODULES 直接从 alipay 的 cdn 上加载
    for (var i = 0; i < CDN_MODULES.length; i++) {
      if (url.indexOf(CDN_MODULES[i] + '/') > 0) {
        return url.replace(ARALE_BASE, ALIPAY_BASE)
      }
    }

    // 如果访问 alipay.im 则从 alipay.im 加载
    if ((location.hostname.indexOf('alipay.im') != -1 || location.hash == '#alipay'
        || (seajs._package && seajs._package.root !== 'arale'))
        && url.indexOf(ARALE_BASE) != -1) {
        // 链接转换成 http://arale.alipay.im/source/overlay/0.9.9/overlay.js
        url = url.replace(ARALE_BASE, 'http://aralejs.alipay.im/source/')
        return url;
    } 

    // 如果是线上demo，则走下面的流程
    
    /* 原来转换 github 的链接地址的，现在不需要了

    url = url.replace(ARALE_BASE + 'arale/', ARALE_BASE);

    // 将 "/master/xxx.js" 转换成 "/master/dist/xxx.js"
    url = url.replace(/\/master\/([^\/]+\.js)$/, '/master/dist/$1')

    // 将 "/1.0.2/xxx.js" 转换成 "/1.0.2/dist/xxx.js"
    url = url.replace(/\/([\d\.]+)\/([^\/]+\.js)$/, '/$1/dist/$2')

    */

    return url

  })

  seajs.config({
    base: ARALE_BASE,
    alias: {
      '$': 'http://static.alipayobjects.com/gallery/jquery/1.7.2/jquery.js',
      '$-debug': 'http://static.alipayobjects.com/gallery/jquery/1.7.2/jquery-debug.js',

      'jquery': 'http://static.alipayobjects.com/gallery/jquery/1.7.2/jquery',
      'jquery-debug': 'http://static.alipayobjects.com/gallery/jquery/1.7.2/jquery-debug.js'
    },
    preload: [
      'seajs/plugin-json',
      'seajs/plugin-text'
    ]
  })
  if (seajs._nicodebug) {
    seajs.config({
      base: '/sea-modules'
    })
  } else {
    seajs.config({
      map: mapRules
    })
  }
})();
