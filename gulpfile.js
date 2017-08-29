'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var sassLint = require('gulp-sass-lint');

var sassMain = 'sass/main.scss';
var sassSrc = 'sass/**/*.s+(a|c)ss';
var cssDest = 'css/';


gulp.task('default', ['compile']);


gulp.task('css', function () {
	return gulp.src( sassMain )
    .pipe( sassGlob() )
		.pipe( sourcemaps.init() )
		.pipe( sass().on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9'],
			cascade: false }) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest(cssDest) );
});


gulp.task('lint', function () {
	return gulp.src( sassSrc )
		.pipe( sassGlob() )
		.pipe( sassLint({
				maxBuffer: 1228800,
			  configFile: './.sassLint-config.yml'
		}) )
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() )
		.pipe( sourcemaps.init() )
		.pipe( sass().on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9'],
			cascade: false }) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest(cssDest) );
});


gulp.task('compile', ['lint']);

gulp.task('css-reload', function () {
	gulp.src(sassMain)
		.pipe( sassGlob() )
		.pipe( sourcemaps.init() )
		.pipe( sass().on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9'],
			cascade: false }) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest(cssDest) )
		.pipe( livereload() );
});

gulp.task('livereload', ['watch-reload']);
gulp.task('reload', ['watch-reload']);


gulp.task('watch', function() {
	gulp.watch(sassSrc, { interval: 10 }, ['css']);
});


gulp.task('watch-reload', function() {
	livereload.listen();
	gulp.watch(sassSrc, { interval: 10 }, ['css-reload']);
});
