
$(document).on('click', '[reveal]', function() {
	var revealLink = $(this);
	var revealId = revealLink.attr('reveal');
	var revealElement = $(document).find('#' + revealId);
	var allRevealLinks = $(document).find('[reveal]');
	var allRevealElements = $(document).find('[reveal-content]');

	// Deselect all reveal links
	$.each(allRevealLinks, function(index, element) {
		$(element).removeClass('selected');
	});

	// Deselect all reveal content
	$.each(allRevealElements, function(index, element) {
		$(element).removeClass('selected');
	});

	// Update selected content and reveal link
	revealLink.addClass('selected');
	revealElement.addClass('selected');
});