$('pre').each(function() {
    var lines, 
        offset;

    // Split 'pre' element content into array by line
    lines = $(this).html().split('\n');

    // Determine amount of white-space to remove
    offset = lines[0].match(/^\s*/)[0].length;

    // Remove undesired white-space from beginning of each line
    lines = lines.map(function(line) {
        return line.slice(offset);
    });

    // Update 'pre' element content with modified lines
    $(this).html(lines.join('\n'));
});