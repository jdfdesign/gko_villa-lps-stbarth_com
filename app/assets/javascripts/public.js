//= require jquery
//= require jquery_ujs
//= require twitter.bootstrap.2.3.1/bootstrap/transition
//= require twitter.bootstrap.2.3.1/bootstrap/alert
//= require twitter.bootstrap.2.3.1/bootstrap/button
//= require twitter.bootstrap.2.3.1/bootstrap/collapse
//= require twitter.bootstrap.2.3.1/bootstrap/dropdown
//= require twitter.bootstrap.2.3.1/bootstrap/modal
//= require flexslider/jquery.flexslider.js

$(document).ready(function() {
  Slideshow.init();
});

var Slideshow = {

  init: function() {
    // The slider being synced must be initialized first
    $('.carousel-flexslider').hide();

    $('.slider-flexslider').flexslider({
      animation: "slide"
    });
  }
}
