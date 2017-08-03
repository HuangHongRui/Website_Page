
// require('lib/bootstrap.min.css');
require('lib/font-awesome.min.css');
require('css/index.css');

var carousel = require("mod/carousel.js");

var HideNav = require("mod/hideNav.js")
var cascade = require("mod/cascade.js");
var GoTop = require("mod/goTop.js");


carousel.autoGo($('.carousel'))
cascade.autoGo($('.ct-waterfall'))
new GoTop()
new HideNav($('#nav'));


