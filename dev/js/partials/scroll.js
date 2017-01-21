// Scroll to section from main navigation
$('.header-controls ul li a').click(function(event) {
    var scrollOffset = 77;
    var scrollTargetId = $(this).attr("href");
    var scrollTarget = $(id).offset().top - offset;

    $('html, body').animate({
        scrollTop: target
    }, 500);

    event.preventDefault();
});