// Sticky header that appears after scrolling past hero
$(window).scroll(function() {
    if($(window).scrollTop() > $(window).height()) {
      $('.header-container').addClass('fixed');
    } 
    else {
      $('.header-container').removeClass('fixed');
    }
});
