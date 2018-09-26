'use strict';

//REQUIRES
var gulp = require('gulp');
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

//PATHS
var html_path = 'site/*.html';
var sass_path = 'site/sass/**/*.scss';
var css_path = 'site/css/';

//WATCH TASK
gulp.task('browser-sync', function() {
	browserSync.init({
		server: "./site"
	});

	gulp.watch(sass_path, ['sass']);
	gulp.watch(html_path).on('change', browserSync.reload);
});

//COMPLILE-SASS TASK
gulp.task('sass', function() {
	return gulp.src(sass_path)
		.pipe(sass({outputStyle: 'default'}).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['cover 100%']}))
		.pipe(gulp.dest(css_path))
		.pipe(browserSync.stream());
})

//DEFAULT TASK
gulp.task('default', ['browser-sync', 'sass']);
