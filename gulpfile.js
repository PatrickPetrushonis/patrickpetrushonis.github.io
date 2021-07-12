// Gulp plugins
var gulp      = require('gulp');
var prefix    = require('gulp-autoprefixer');
var clean     = require('gulp-clean-css');
var data      = require('gulp-data');
var gulpIf    = require('gulp-if');
var imagemin  = require('gulp-imagemin');
var include   = require('gulp-include');
var uglify    = require('gulp-uglify');
var maps      = require('gulp-sourcemaps');
var notify    = require('gulp-notify');
var plumber   = require('gulp-plumber');
var render    = require('gulp-nunjucks-render');
var sass      = require('gulp-sass');
var csvToJson = require('gulp-advanced-csv-to-json');

// Other plugins
var sequence  = require('run-sequence');
var sync      = require('browser-sync');
var del       = require('del');
var fs        = require('fs');

/** 
 * Commands:
 * gulp
 * gulp delete
 * gulp images
 * gulp nunjucks
 * gulp pdfs
 * gulp sass
 * gulp scripts
 * gulp watch
 */

// Project build directories
var config = {
  src: 'dev/',
  dest: 'app/'
}

// Whether build is for testing or production
var isProd = false;

// Prompt any error then end current task
function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      // Custom error title
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
    })
  });
}

// Activates browser sync to automatically update browser upon detecting changes
gulp.task('sync', function() {
  sync({
    // Set base directory of server to root folder
    server: { baseDir: './' },
    // Prevents browsers from opening automatically
    open: false,
    // Disable pop-over notification
    notify: true
  })
});

// Clean out files prior to build
gulp.task('delete', function(callback) {
    return del(config.dest, callback);
});

// Concatenates and minifies all js files
gulp.task('scripts', function() {
  var includeSettings = {
    includePaths: [
      __dirname + "/bower_components",
      __dirname + "/dev/js"
    ]
  }

  return gulp.src(config.src + 'js/main.js')
    .pipe(customPlumber('Error Running Scripts'))
    // Initialize sourcemaps
    .pipe(gulpIf(isProd == false, maps.init()))
    .pipe(include(includeSettings))
    .pipe(gulpIf(isProd == true, uglify()))
    // Write sourcemaps
    .pipe(gulpIf(isProd == false, maps.write()))
    .pipe(gulp.dest(config.dest + 'js'))
    .pipe(notify({ message: 'Scripts Complete!', onLast: true }))
    // Tells browser sync to reload files when task is done
    .pipe(sync.reload({ stream: true }))
});

// Compile all sass into css
gulp.task('styles', function() {
  var sassOptions = { outputStyle: 'compressed' };
  var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };

  return gulp.src(config.src + 'scss/**/*.scss')
    .pipe(customPlumber('Error Running Sass'))
    // Initialize sourcemaps
    .pipe(gulpIf(isProd == false, maps.init()))
    .pipe(gulpIf(isProd == false, sass(), sass(sassOptions)))
    // Add prefixes for IE8, IE9 and last 2 versions of all other browsers
    .pipe(prefix(autoprefixerOptions))
    // Write sourcemaps
    .pipe(gulpIf(isProd == false, maps.write()))
    .pipe(gulp.dest(config.dest + 'css'))
    .pipe(notify({ message: 'Styles Complete!', onLast: true }))
    // Tells browser sync to reload files when task is done
    .pipe(sync.reload({ stream: true }))
});

// Compile all nunjucks logic into html
gulp.task('nunjucks', function() {
  var defaults = {
    path: config.src + 'templates/',
    ext: '.html',
    data: {},
    inheritExtension: false,
    envOptions: { watch: false },
    manageEnv: null,
    loaders: null
  };

  // Get all html and nunjucks files in pages
  return gulp.src(config.src + 'pages/**/*.+(html|nunjucks)')
    .pipe(customPlumber('Error Running Nunjucks'))
    .pipe(data(function() { return JSON.parse(fs.readFileSync(config.src + 'data/data.json')) }))
    .pipe(render(defaults))
    .pipe(gulp.dest(''))
    .pipe(notify({ message: 'Nunjucks Complete!', onLast: true }))
    // Tells browser sync to reload files when task is done
    .pipe(sync.reload({ stream: true }))  
});

// Minify all images
gulp.task('images', function() {
  var imageSettings = [
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]

  return gulp.src(config.src + 'img/**/*')
    .pipe(imagemin(imageSettings))
    .pipe(gulp.dest(config.dest + 'img'))
    .pipe(notify({ message: 'Images Complete!', onLast: true }))
});

// Move pdf files
gulp.task('pdfs', function() {
  return gulp.src(config.src + 'pdfs/*')    
    .pipe(gulp.dest(config.dest + 'pdfs'))
    .pipe(notify({ message: 'PDFs Complete!', onLast: true }))
});

// Move json files
gulp.task('data', function() {
  return gulp.src(config.src + 'data/*')    
    .pipe(gulp.dest(config.dest + 'data'))
    .pipe(notify({ message: 'Data Complete!', onLast: true }))
});

// Convert CSV files to JSON
gulp.task('csv', function() {
  return gulp.src(config.src + 'csv/*.conf')
    .pipe(csvToJson({
      tabSize : 4
    }))
});

// Watch specified folders and files for any changes
gulp.task('watch', function() {
  gulp.watch(config.src + 'img/**/*', ['images']);
  gulp.watch(config.src + 'js/**/*.js', ['scripts']);
  gulp.watch(config.src + 'scss/**/*.scss', ['styles']);
  gulp.watch([
    config.src + 'templates/**/*.+(html|nunjucks)', 
    config.src + 'pages/**/*.+(html|nunjucks)',
    config.src + 'data/data.json'], 
    ['nunjucks']
  );
});

gulp.task('prod', function(callback) {
  isProd = true;

  sequence(
    ['default'],
    callback
  )
});

// Executes a sequence of tasks
gulp.task('default', function(callback) {
  sequence(
    ['delete'],
    ['csv', 'images', 'scripts', 'styles', 'nunjucks', 'pdfs', 'data'],
    ['sync', 'watch'],
    callback
  )
});
