'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var spritesmith = require('gulp.spritesmith');


gulp.task('css', function () {
	gulp.src('./assets/sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./assets/css'))
});

gulp.task('css-reload', function () {
	gulp.src('./assets/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/css'))
		.pipe(livereload());
});


gulp.task('sprites', function () {
  var spriteData = gulp.src('./assets/images/sprites/*.*')
		.pipe(spritesmith({
    	imgName: 'sprites.png',
    	cssName: '_sprites.scss',
			padding: 10,
			algorithm: 'binary-tree',
			cssOpts: {functions: false}
  }));

	spriteData.img.pipe(gulp.dest('./assets/images/'));
	spriteData.css.pipe(gulp.dest('./assets/sass/'));
});


gulp.task('browser-reload',function(){
  gulp.src(['./assets/js/**/*.js'])
  .pipe(livereload())
});

gulp.task('watch', function() {
	gulp.watch('./assets/sass/**/*.scss', ['css']);
});

gulp.task('watch-reload', function() {
	livereload.listen();
	gulp.watch('./assets/sass/**/*.scss', ['css-reload']);
	gulp.watch(['./assets/js/**/*.js'], ['browser-reload']);
});