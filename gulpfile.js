"use strict";

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	del = require('del'),
	livereload = require('gulp-livereload'),
	autoprefixer = require('gulp-autoprefixer'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	useref = require('gulp-useref'),
	iff = require('gulp-if'),
	minifyCss = require('gulp-minify-css'),
	pages = require('gulp-gh-pages');

var options = {
	src: 'src',
	dist: 'dist'
};

var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('compileSass', function() {
	return gulp.src(options.src + '/scss/application.scss')
	//.pipe(maps.init())
	.pipe(sass())
	//.pipe(maps.write('./'))
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(gulp.dest(options.src + '/css'))
	.pipe(livereload());
});

gulp.task('svgstore', function () {
    return gulp
        .src(options.src + '/img/svg/*.svg')
        .pipe(svgmin({
            plugins: [{
                cleanupIDs: false
            }]
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(options.src + '/img/sprite'));
});

gulp.task('watchFiles', function() {
	livereload.listen();
	gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);
	gulp.watch(options.src + '/img/svg/*.svg', ['svgstore']);
	//gulp.watch(options.src + 'js/main.js', ['concatScripts']);
});

gulp.task('clean', function() {
	del('dist');
});

gulp.task('html', ['compileSass'], function() {
	gulp.src(options.src + '/*.html')
		.pipe(useref())
		.pipe(iff('*.js', uglify()))
		.pipe(iff('*.css', minifyCss()))
		.pipe(gulp.dest(options.dist));
});

// Don't forget to include SVGs in the build task
gulp.task('build', ['html'], function() {
	return gulp.src([options.src + '/img/**', options.src + '/fonts/**'], {base: options.src})
		.pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['clean', 'build'], function() {
	return gulp.src(options.dist + '/**/*')
		.pipe(pages());
});

gulp.task('serve', ['watchFiles']);

gulp.task('default', ['clean'], function() {
	gulp.start('build');
});











