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
var cssProdDest = 'prod/css';
var sassMain = sassDest +'main.scss';

// get all sass files but exclude any vendor sass inside of sass/
var sassSrc = [sassDest +'**/*.s+(a|c)ss', '!'+ sassDest +'/vendor/**'];

// same as above, but also exclude main.scss and _settings.scss so
// comb doesn't insert hard imports for every scss file.
var sassSrcComb = [sassDest +'**/*.s+(a|c)ss', '!'+ sassMain, '!'+ sassDest +'_settings.scss', '!'+ sassDest +'/vendor/**'];

gulp.task('default', ['css']);


gulp.task('css', function () {
	return gulp.src( sassMain )
    .pipe( sassGlob() )
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'expanded'}).on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false }) )
		.pipe( sourcemaps.write('./sourcemaps') )
		.pipe( gulp.dest(cssDest) );
});


gulp.task('lint', function () {
	return gulp.src( sassSrc )
		.pipe( sassGlob() )
		.pipe( sassLint({
				maxBuffer: 1228800,
        configFile: './.sass-lint.yml'
		}) )
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() )
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'expanded'}).on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false }) )
		.pipe( sourcemaps.write('./sourcemaps') )
		.pipe( gulp.dest(cssDest) );
});


gulp.task('comb', function() {
  return gulp.src( sassSrcComb )
    .pipe( sassGlob() )
    .pipe( cssComb() )
    .pipe( gulp.dest( sassDest ) );
});


gulp.task('compile', ['comb', 'lint']);


gulp.task('prod', function () {
	return gulp.src( sassMain )
    .pipe( sassGlob() )
		.pipe( sass({outputStyle: 'compressed'}).on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false }) )
		.pipe( gulp.dest(cssProdDest) );
});


gulp.task('css-reload', function () {
	gulp.src(sassMain)
		.pipe( sassGlob() )
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'expanded'}).on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false }) )
		.pipe( sourcemaps.write('./sourcemaps') )
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
