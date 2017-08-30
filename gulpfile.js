'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var sassLint = require('gulp-sass-lint');
var cssComb = require('gulp-csscomb');

var sassDest = 'sass/';
var cssDest = 'css/';
var sassMain = sassDest +'main.scss';
var sassSrc = sassDest +'**/*.s+(a|c)ss';
var sassSrcNoVendor = sassDest +'[!vendor]**/*.s+(a|c)ss';

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
	return gulp.src( sassSrcNoVendor )
		.pipe( sassGlob() )
		.pipe( sassLint({
				maxBuffer: 1228800,
        configFile: './.sass-lint.yml'
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


gulp.task('comb', function() {
  return gulp.src( sassSrcNoVendor )
    .pipe( sassGlob() )
    .pipe( cssComb() )
    .pipe( gulp.dest( sassDest ) );
});


gulp.task('compile', ['comb', 'lint']);

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
