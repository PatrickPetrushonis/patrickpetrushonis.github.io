// Sticky header that appears after scrolling past hero
$(window).scroll(function() {
    if($(window).scrollTop() > $(window).height()) {
      $('.header-container').addClass('fixed');
    } 
    else {
      $('.header-container').removeClass('fixed');
    }
});

// Expand header navigation mobile variant
$('.header-controls__nav-toggle').click(function() {
  $('.nav-menu').toggleClass('show-nav');

  var headerNav = $('.header-controls ul');

  if(headerNav.hasClass('show-nav')) {
    headerNav.removeClass('show-nav');
  }
  else {
    headerNav.addClass('show-nav');
  }
});
