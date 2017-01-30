var patternColors = ['#2b275a', '#5d2659', '#1e314a', '#265479', '#387cb3'];

function generatePattern() {
  var pattern = Trianglify({ 
    width: window.innerWidth, 
    height: window.innerHeight,
    cell_size: 45,
    variance: 0.9,
    x_colors: patternColors
  });

  return pattern;
}

$(document).on('resize', function() {
  $(document).find('.hero__container').prepend(generatePattern().canvas());
});

$(document).ready(function() {
  $(document).find('.hero__container').prepend(generatePattern().canvas())
});
