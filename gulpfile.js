'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');

var sassDest = 'sass/';
var cssDest = 'css/';
var sassMain = sassDest + 'main.scss';
var sassSrc = sassDest + '**/*.s+(a|c)ss';


function css() {
	return gulp
		.src( sassMain )
		.pipe( sassGlob() )
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'expanded'}).on('error', sass.logError) )
		.pipe( autoprefixer({
			cascade: false }) )
		.pipe( sourcemaps.write('./sourcemaps') )
		.pipe( gulp.dest(cssDest) );
}

function cssReload() {
	return gulp
		.src(sassMain)
		.pipe( sassGlob() )
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'expanded'}).on('error', sass.logError) )
		.pipe( autoprefixer({
			cascade: false }) )
		.pipe( sourcemaps.write('./sourcemaps') )
		.pipe( gulp.dest(cssDest) )
		.pipe( livereload() );
}

function watch() {
	return gulp.watch(sassSrc, gulp.series('css'));
}

function watchReload() {
	livereload.listen();
	return gulp.watch(sassSrc, gulp.series('css-reload'));
}


exports['css-reload'] = cssReload;
exports.watch = watch;
exports.reload = watchReload;
exports.livereload = watchReload;
exports['watch-reload'] = watchReload;
exports.css = css;
exports.default = css;
