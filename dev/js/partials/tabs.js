$(document).ready(function() {
  $(document).on('click', '.section__tabs-container [tab-data]', function() {
    var tabs = $(this).closest('.section__tabs-container').find('[tab-data]');
    var contentId = $(this).attr('tab-data');
    var tabContents = $(document).find('.section__tabs-contents .section__tabs-content');

    // Unselect all tabs
    tabs.each(function() { $(this).removeClass('selected'); });

    // Indicate this tab has been clicked
    $(this).addClass('selected');

    // Hide content of all tabs
    tabContents.each(function() { $(this).removeClass('visible'); });

    // Display content associated with clicked tab
    $(document).find('#' + contentId).addClass('visible');
  });
});
