// Scroll to section from main navigation
$('.header-controls a').click(function(event) {
    var scrollOffset = 77;
    var scrollTargetId = $(this).attr("href");
    var scrollTarget = $(scrollTargetId).offset().top - scrollOffset;

    $('html, body').animate({
        scrollTop: scrollTarget
    }, 500);

    // Force clicked anchor to lose focus
    $(this).parent().blur();

    event.preventDefault();

	// Ensure mobile nav collapses on navigation scroll
	if($('.header-controls__nav-toggle input[type="checkbox"]').is(':checked')) {
		$('.header-controls__nav-toggle input[type="checkbox"]').prop('checked', false);
    $('.header-controls ul').removeClass('show-nav');
	}
});
