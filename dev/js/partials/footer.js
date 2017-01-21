// Inject bottom padding to main content equal to footer height
function adjustPadding() { $('.main-content').css('padding-bottom', $('.footer-container').height()); };

// Initial injection
adjustPadding();

// Inject on window resize
$(window).resize(function() { adjustPadding(); });