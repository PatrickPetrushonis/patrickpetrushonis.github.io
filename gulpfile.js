// Gulp plugins
var gulp 		= require('gulp');
var sass 		= require('gulp-sass');
var plumber = require('gulp-plumber');
var notify 	= require('gulp-notify');
var prefix	= require('gulp-autoprefixer');
var maps		= require('gulp-sourcemaps');
var sprite	= require('gulp.spritesmith');
var gulpIf 	= require('gulp-if');
// Other plugins
var sync 		= require('browser-sync');

/** 
 * Commands:
 * gulp
 * gulp sass
 * gulp scripts
 * gulp watch
 */

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
		server: {
			baseDir: 'dev'			
		},
		// Prevents browsers from opening automatically
		open: false,
		// Disable pop-over notification
		notify: false,
	})
})

// Concatenates and minifies all JS files
gulp.task('scripts', function(){
    gulp.src('assets/js/main.js')
    // Checks for errors in all scripts
    .pipe(customPlumber('Error Running Scripts'))
    // Initialize sourcemaps
    .pipe(maps.init())
    // Write sourcemaps
    .pipe(maps.write())
    .pipe(gulp.dest('dev/js'))
    .pipe(notify({ message: 'Scripts Complete!', onLast: true }))
    // Tells browser sync to reload files when task is done
	.pipe(sync.reload({
		stream: true
	}))
});

// Compile all sass into css
gulp.task('sass', function() {
	return gulp.src('assets/scss/**/*.scss')
		// Checks for errors in all plugins
		.pipe(customPlumber('Error Running Sass'))
		// Initialize sourcemaps
		.pipe(maps.init())
		.pipe(sass())
		// Runs produced css through autoprefixer
		.pipe(prefix({
			// Add prefixes for IE8, IE9 and last 2 versions of all other browsers
			browsers: ['ie 8-9', 'last 2 versions']
		}))
		// Write sourcemaps
		.pipe(maps.write())
		.pipe(gulp.dest('dev/css'))
		.pipe(notify({ message: 'Sass Complete!', onLast: true }))
		// Tells browser sync to reload files when task is done
		.pipe(sync.reload({
			stream: true
		}))
});

// Watch specified folders and files for any changes
gulp.task('watch', function(){
	gulp.watch('assets/scss/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.scss', ['sass']);
});

// Executes a sequence of tasks
gulp.task('default', ['scripts', 'sass', 'sync', 'watch']);
