'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');

var sassMain = 'sass/main.scss';
var sassSrc = 'sass/**/*.scss';
var cssDest = 'css/';


gulp.task('default', ['css']);


gulp.task('css', function () {
	return gulp.src(sassMain)
    .pipe(sassGlob())
		.pipe( sourcemaps.init() )
		.pipe( sass().on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9'],
			cascade: false }) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest(cssDest) );
});


gulp.task('css-reload', function () {
	gulp.src(sassMain)
		.pipe(sassGlob())
		.pipe( sourcemaps.init() )
		.pipe( sass().on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9'],
			cascade: false }) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest(cssDest) )
		.pipe( livereload() );
});


gulp.task('watch', function() {
	gulp.watch(sassSrc, { interval: 10 }, ['css']);
});


gulp.task('watch-reload', function() {
	livereload.listen();
	gulp.watch(sassSrc, { interval: 10 }, ['css-reload']);
});
