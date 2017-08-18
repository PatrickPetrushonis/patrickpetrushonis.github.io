// Gulp plugins
var gulp      = require('gulp');
var prefix    = require('gulp-autoprefixer');
var data      = require('gulp-data');
var gulpIf    = require('gulp-if');
var imagemin  = require('gulp-imagemin');
var include   = require('gulp-include');
var notify    = require('gulp-notify');
var render    = require('gulp-nunjucks-render');
var plumber   = require('gulp-plumber');
var sass      = require('gulp-sass');
var maps      = require('gulp-sourcemaps');

// Other plugins
var sequence  = require('run-sequence');
var sync      = require('browser-sync');
var del       = require('del');
var fs        = require('fs');

/** 
 * Commands:
 * gulp
 * gulp images
 * gulp nunjucks
 * gulp sass
 * gulp scripts
 * gulp watch
 */

// Project build directories
var config = {
  src: 'dev/',
  dest: 'app/'
}

// Plug-in settings
var includeSettings = {
  includePaths: [
    __dirname + "/bower_components",
    __dirname + "/dev/js"
  ]
}

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
  return gulp.src(config.src + 'js/main.js')
    .pipe(customPlumber('Error Running Scripts'))
    // Initialize sourcemaps
    .pipe(maps.init())
    .pipe(include(includeSettings))
    // Write sourcemaps
    .pipe(maps.write())
    .pipe(gulp.dest(config.dest + 'js'))
    .pipe(notify({ message: 'Scripts Complete!', onLast: true }))
    // Tells browser sync to reload files when task is done
    .pipe(sync.reload({ stream: true }))
});

// Compile all sass into css
gulp.task('styles', function() {
  return gulp.src(config.src + 'scss/**/*.scss')
    .pipe(customPlumber('Error Running Sass'))
    // Initialize sourcemaps
    .pipe(maps.init())
    .pipe(sass())
    // Runs produced css through autoprefixer
    .pipe(prefix({
      // Add prefixes for IE8, IE9 and last 2 versions of all other browsers
      browsers: ['> 1%', 'last 2 versions']
    }))
    // Write sourcemaps
    .pipe(maps.write())
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
  return gulp.src(config.src + 'img/**/*')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest(config.dest + 'img'))
    .pipe(notify({ message: 'Images Complete!', onLast: true }))
});

// Move pdf files
gulp.task('pdfs', function() {
  return gulp.src(config.src + 'pdfs/*')    
    .pipe(gulp.dest(config.dest + 'pdfs'))
    .pipe(notify({ message: 'PDFs Complete!', onLast: true }))
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

// Executes a sequence of tasks
gulp.task('default', function(callback) {
  sequence(
    ['delete'],
    ['images', 'scripts', 'styles', 'nunjucks', 'pdfs'],
    ['sync', 'watch'],
    callback
  )
});
