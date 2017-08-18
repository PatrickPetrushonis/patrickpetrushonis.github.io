
// Scroll to section from main navigation
$(document).on('click', '[data="scroll"]', function(event) {
    var scrollOffset = 77;
    var scrollTargetId = $(this).attr("href");
    var scrollTarget = $(scrollTargetId).offset().top - scrollOffset;

    // Scroll page down to target element
    $('html, body').animate({
        scrollTop: scrollTarget
    }, 500);

    // Prevent scroll element from jumping to target element
    event.preventDefault();

    // Force clicked anchor to lose focus
    $(this).parent().blur();

    // Ensure mobile nav collapses on navigation scroll
    if($('.header-controls__nav-toggle input[type="checkbox"]').is(':checked')) {
        $('.header-controls__nav-toggle input[type="checkbox"]').prop('checked', false);
        $('.header-controls ul').removeClass('show-nav');
    }
});

// Hide 'return to top' button while ScrollTop is near top of page
$(document).on('scroll', function() {
    var scrollTopButton = $(document).find('.button__return-top');

    if($(window).scrollTop() > 100) {
        scrollTopButton.css('opacity', '1');
        scrollTopButton.css('visibility', 'visible');
    }
    else {
        scrollTopButton.css('opacity', '0');
        scrollTopButton.css('visibility', 'hidden');
    }
});

// Scroll to url section with header offset on page load
$(document).ready(function() {
    var path = window.location.href;
    var pathSub = path.split('#')[1];

    if(pathSub !== undefined && pathSub !== path) {
        var scrollOffset = 77;
        var scrollTarget = $('#' + pathSub);
        var scrollLocation = $(scrollTarget).offset().top - scrollOffset;

        $('html, body').animate({
            scrollTop: scrollLocation
        }, 500);
    }
});
