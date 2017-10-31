var patternColors = ['#2b275a', '#5d2659', '#1e314a', '#265479', '#387cb3'];

function generatePattern(parent) {
  var patternHeight = parent.outerHeight();
  var patternWidth = $(window).outerWidth();

  var pattern = Trianglify({ 
      width: patternWidth, 
      height: patternHeight,
      cell_size: 45,
      variance: 0.9,
      x_colors: patternColors
  });

  return pattern;
}

function handlePattern() {
  // Remove existing canvas (if any)
  $(document).find('.hero__trianglify-canvas').remove();

  // Create a new canvas for hero container
  
  var heroContainers = $(document).find('[container="hero"]');

  $.each(heroContainers, function(index, element) {
    var patternCanvas = generatePattern($(element)).canvas();
    $(element).append(patternCanvas);
    $(patternCanvas).addClass('hero__trianglify-canvas');
  });

  
}

$(window).on('resize', function() { handlePattern(); });

$(document).ready(function() { 
  handlePattern();

  // Animate fade-in for hero canvas
  var heroCanvas = $(document).find('.hero__trianglify-canvas');
  $.each(heroCanvas, function(index, element) {
    $(element).css('opacity', 0);
    $(element).animate({ opacity: 1 }, 250);
  });
});
