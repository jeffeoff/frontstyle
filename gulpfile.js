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

var sassSrc = './sass/**/*.scss';
var cssSrc = './css/**/*.css';
var cssDest = './css';
var jsSrc = './js/**/*.js';
var spriteSrc = './images/sprites/*.*';


gulp.task('default', ['css']);


gulp.task('css', function () {
	return gulp.src(sassSrc)
		.pipe( sourcemaps.init() )
		.pipe( sass().on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9'],
			cascade: false }) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest(cssDest) );
});


gulp.task('css-reload', function () {
	gulp.src(sassSrc)
		.pipe( sourcemaps.init() )
		.pipe( sass().on('error', sass.logError) )
		.pipe( autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9'],
			cascade: false }) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest(cssDest) )
		.pipe( livereload() );
});


gulp.task('uglify-css', function() {
	gulp.src(cssSrc)
		.pipe(uglifycss({
			'max-line-len': 80
		}))
		.pipe(gulp.dest('./production/uglified'));
});

gulp.task('uglify-js', function() {
  gulp.src(jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest('./production/uglified'));
});


gulp.task('concat-css', function() {
	gulp.src(cssSrc)
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./production/concat'));
});


gulp.task('concat-js', function() {
	gulp.src(jsSrc)
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./production/concat'));
});


gulp.task('production-css', ['css'], function() {
	gulp.src(cssSrc)
		.pipe(uglifycss({
			'max-line-len': 80
		}))
		.pipe(concat('production.css'))
		.pipe(gulp.dest('./production'));
});


gulp.task('production-js', function() {
	gulp.src(jsSrc)
		.pipe(uglify())
		.pipe(concat('production.js'))
		.pipe(gulp.dest('./production'));
});


gulp.task('production', ['production-css', 'production-js']);


gulp.task('sprites', function () {
  var spriteData = gulp.src(spriteSrc)
    .pipe(spritesmith({
      imgName: 'sprites.png',
      cssName: '_sprites.scss',
      padding: 0,
      algorithm: 'binary-tree',
			cssOpts: {functions: false}
    }));

  spriteData.img.pipe(gulp.dest('./images/'));
  spriteData.css.pipe(gulp.dest('./sass/utilities'));
});


gulp.task('sprites-retina', function () {
  var spriteData = gulp.src(spriteSrc)
    .pipe(spritesmith({
      // Filter out `@2x` (retina) images to separate spritesheet
      // e.g. `github@2x.png`, `twitter@2x.png`
      retinaSrcFilter: './images/sprites/*@2x.png',
      imgName: 'sprites.png',
      retinaImgName: 'sprites@2x.png',
      cssName: '_sprites.scss',
      padding: 0,
      algorithm: 'binary-tree',
			cssOpts: {functions: false}
    }));

  spriteData.img.pipe(gulp.dest('./images/'));
  spriteData.css.pipe(gulp.dest('./sass/utilities'));
});


function browserReload(event) {
  gulp.src(event.path, {read: false})
    .pipe(livereload());
}


gulp.task('watch', function() {
	gulp.watch('./sass/**/*.scss', { interval: 25 }, ['css']);
});


gulp.task('watch-reload', function() {
	livereload.listen();
	gulp.watch(sassSrc, { interval: 25 }, ['css-reload']);
	gulp.watch([jsSrc], { interval: 25 }, browserReload);
});
