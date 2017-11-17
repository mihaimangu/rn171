var url = 'localhost';

var gulp = require('gulp');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var reactify = require('reactify');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling etc.
var browserify = require('browserify');
var es6ify = require('es6ify');
var plumber = require('gulp-plumber');
var tap        = require("gulp-tap");
var gutil      = require('gulp-util');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var sass = require('gulp-sass'),
    browserSync  = require('browser-sync'), // Asynchronous browser loading on .scss file changes
    reload       = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');

gulp.task('renderjs', function(){
    return gulp.src("src/react/app.js")
    .pipe(plumber())
    .pipe(tap(
        function(file)
        {
            var d = require('domain').create();
            d.on("error",
                function(err){
                    gutil.log(gutil.colors.red("Browserify compile error:"), err.message, "\n\t", gutil.colors.cyan("in file"), file.path);
                      gutil.beep();
                }
            );
            
            d.run(function(){
               file.contents = browserify({
                   entries: [file.path],
                   transform: [babelify.configure({
                       presets: ['react', 'es2015', 'stage-0'],
                       plugins: ['transform-es2015-modules-commonjs']
                   })],
                   debug: true
               }).bundle();
            });
        }
    ))
    .pipe(gulp.dest('./dist'));
});

gulp.task('r-min', function(){
    return gulp.src("src/react/app.js")
    .pipe(plumber())
    .pipe(tap(
        function(file)
        {
            var d = require('domain').create();
            d.on("error",
                function(err){
                    gutil.log(gutil.colors.red("Browserify compile error:"), err.message, "\n\t", gutil.colors.cyan("in file"), file.path);
                      gutil.beep();
                }
            );
            
            d.run(function(){
               file.contents = browserify({
                   entries: [file.path],
                   transform: [babelify.configure({
                       presets: ['react', 'es2015', 'stage-0'],
                       plugins: ['transform-es2015-modules-commonjs']
                   })],
                   debug: false
               }).bundle();
            });
        }
    ))
     .pipe(streamify(uglify))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'))
  .pipe(browserSync.stream());
});



gulp.task('browser-sync', function() {
	browserSync.init({

		server: './dist',
		injectChanges: true

	});
});

/*
gulp.task('default', ['sass', 'browser-sync'], function(){
   

     gulp.watch('./**//*.php', reload);
   
}); 
*/

gulp.task
gulp.task('default', ['browser-sync'], function(){
   
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('*.php', reload);
    gulp.watch("src/react/**/*.js", ['renderjs', reload]);  
   
}); 



