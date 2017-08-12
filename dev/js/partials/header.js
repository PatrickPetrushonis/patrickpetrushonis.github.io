
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
