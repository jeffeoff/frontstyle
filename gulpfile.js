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
		.pipe( sourcemaps.init() )
		.pipe( sass().on('error', sass.logError) )
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 8'],
			cascade: false }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./assets/css'));
});


gulp.task('css-reload', function () {
	gulp.src('./assets/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./assets/css'))
		.pipe(livereload());
});


gulp.task('uglify-css', function() {
	gulp.src('./assets/css/**/*.css')
		.pipe(uglifycss({
			'max-line-len': 80
		}))
		.pipe(gulp.dest('./assets/production/uglified'));
});


gulp.task('uglify-js', function() {
  gulp.src('./assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/production/uglified'));
});


gulp.task('prefix', function() {
	gulp.src('./assets/css/**/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 8'],
			cascade: false }))
		.pipe(gulp.dest('./assets/production/prefixed'));
});


gulp.task('concat-css', function() {
	gulp.src('./assets/css/**/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./assets/production/concat'));
});


gulp.task('concat-js', function() {
	gulp.src('./assets/js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./assets/production/concat'));
});


gulp.task('production-css', ['css'], function() {
	gulp.src('./assets/css/**/*.css')
		.pipe(uglifycss({
			'max-line-len': 80
		}))
		.pipe(concat('production.css'))
		.pipe(gulp.dest('./assets/production'));
});


gulp.task('production-js', function() {
	gulp.src('./assets/js/**/*.js')
		.pipe(uglify())
		.pipe(concat('production.js'))
		.pipe(gulp.dest('./assets/production'));
});


gulp.task('sprites', function () {
  var spriteData = gulp.src('./assets/images/sprites/*.*')
		.pipe(spritesmith({
    	imgName: 'sprites.png',
    	cssName: '_sprites.scss',
			padding: 0,
			algorithm: 'binary-tree',
			cssOpts: {functions: false}
  }));

	spriteData.img.pipe(gulp.dest('./assets/images/'));
	spriteData.css.pipe(gulp.dest('./assets/sass/'));
});

gulp.task('production', ['production-css', 'production-js'], function() {
});


function browserReload(event) {
  gulp.src(event.path, {read: false})
    .pipe(livereload());
}


gulp.task('watch', function() {
	gulp.watch('./assets/sass/**/*.scss', { interval: 200 }, ['css']);
});


gulp.task('watch-reload', function() {
	livereload.listen();
	gulp.watch('./assets/sass/**/*.scss', { interval: 200 }, ['css-reload']);
	gulp.watch(['./assets/js/*.js', './*.html'], { interval: 200 }, notifyLivereload);
});
