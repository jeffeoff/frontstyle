'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var spritesmith = require('gulp.spritesmith');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');


gulp.task('css', function () {
	return gulp.src('./assets/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('css-reload', function () {
	gulp.src('./assets/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./assets/css'))
		.pipe(livereload());
});

gulp.task('uglify-css', function() {
	gulp.src('./assets/css/*.css')
		.pipe(uglifycss({
			'max-line-len': 80
		}))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('uglify-js', function() {
  gulp.src('./assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'));
});

gulp.task('prefix', function() {
	gulp.src('./assets/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 8'],
			cascade: false }))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('concat-css', function() {
	gulp.src('./assets/css/**/*.css')
		.pipe(concat('screen.css'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('production-css', ['css'], function() {
	gulp.src('./assets/css/**/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 8'],
			cascade: false
		}))
		.pipe(uglifycss({
			'max-line-len': 80
		}))
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./assets/css/production'));
});

gulp.task('production-js', function() {
	gulp.src('./assets/js/**/*.js')
		.pipe(uglify())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./assets/js/production'));
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

gulp.task('production', ['production-css', 'production-js'], function() {
});

gulp.task('browser-reload',function(){
  gulp.src(['./assets/js/**/*.js'])
  	.pipe(livereload());
});

gulp.task('watch', function() {
	gulp.watch('./assets/sass/**/*.scss', ['css']);
});

gulp.task('watch-reload', function() {
	livereload.listen();
	gulp.watch('./assets/sass/**/*.scss', ['css-reload']);
	gulp.watch(['./assets/js/**/*.js', './**/*.html'], ['browser-reload']);
});
