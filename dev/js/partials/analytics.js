// Add data-tracking attribute to specified elements with ga-label attribute
$('[ga-label]').attr('data-tracking', '');

// Analytics code provided by Google
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-91272203-1', 'auto');
ga('send', 'pageview');

// Send event to Google Analytics
function sendEvent(label) {
	ga('send', 'event', {
		eventCategory: 'Pattern Library', 
		eventAction: 'click',
		eventLabel: 'PL - ' + label
	});
}

// Handle event sending prior to link navigation
jQuery("a[data-tracking]").click(function(e) {
	var hasLink = false;

	// Prevent default click event on a tags with page changing navigation
	if($(this).attr('href') != undefined && 
	   $(this).attr('href') != '#top-of-page' &&
	   $(this).filter("a[href!='javascript:void(0)']") &&     
	   !$(this).hasClass('scroll-on-page-link')) {
		hasLink = true;		
	}

	// Prevent link redirect that would disrupt event sending 
	if(hasLink) { e.preventDefault(); }

	sendEvent(jQuery(this).attr('ga-label'));

	// Process event after successfully sending event
	if(hasLink) {
		if($(this).hasClass('data-tracking-newtab')) {
			$(this).attr("target", "_blank");
			window.open($(this).attr("href"));
		} 
		else { 
			// Redirect browser
			window.location = this.href; 
		}
	}	
});
