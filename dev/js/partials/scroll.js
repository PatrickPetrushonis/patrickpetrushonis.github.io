
// Scroll to section from main navigation
$('.header-controls a').click(function(event) {
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

// Scroll to url section with header offset
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
