var patternColors = ['#2b275a', '#5d2659', '#1e314a', '#265479', '#387cb3'];

function generatePattern() {
  var pattern = Trianglify({ 
    width: $(window).outerWidth(), 
    height: $(window).outerHeight() * 0.5,
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
  var patternCanvas = generatePattern().canvas();
  $(document).find('.hero__container').append(patternCanvas);
  $(patternCanvas).addClass('hero__trianglify-canvas');
}

$(window).on('resize', function() { handlePattern(); });

$(document).ready(function() { 
  handlePattern();
});
