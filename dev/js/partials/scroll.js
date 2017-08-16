
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
});
