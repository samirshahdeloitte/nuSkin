"use strict";

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    rev = require('gulp-rev'),
    usemin = require('gulp-usemin'),
    sourcemaps = require('gulp-sourcemaps'),
    flatten = require('gulp-flatten'),
    zip = require('gulp-zip'),
    preprocess = require('gulp-preprocess'),
    stripDebug = require('gulp-strip-debug'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    cached = require('gulp-cached'),
    jadeInheritance = require('gulp-jade-inheritance'),
    _if = require('gulp-if'),
    isWindows = /^win/.test(require('os').platform()),
    notify = require('gulp-notify'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    babel = require('gulp-babel'),
    server = require('gulp-server-livereload'),

    paths = {
	jade : {
		src : ['source/**/*.jade'],
		dst : './app/html'
	},
	sass : {
		src : ['source/sass/**/*.scss', 'source/sass/**/*'],
		dst : './app/css'
	},
	allJS : {
		src : ['source/vendor/**/*.js', 'source/js/**/*.js', 'source/modules/**/*.js'],
		dst : './app/js'
	},
	images : {
		src : 'source/assets/images/**/*',
		dst : './app/assets/img'
	},
	fonts : {
		src : 'source/assets/fonts/*',
		dst : './app/assets/fonts'
	},
	json : {
		src : 'source/data/**/*',
		dst : './app/data/'
	}
};

gulp.task('serve', function() {
  gulp.src('./app')
    .pipe(server({
      defaultFile: "index.html",
      livereload: false,
      directoryListing: false,
      open: true
    }));
});

gulp.task('jade', function() {
	return gulp.src(paths.jade.src).pipe(plumber()).pipe(cached('jade')).pipe(jadeInheritance({
		basedir : 'src/'
	})).pipe(jade({
		pretty : true
	})).pipe(gulp.dest(paths.jade.dst)).pipe(_if(!isWindows, notify({
		'message' : 'Jade compiled',
		'onLast' : true
	})));
});

gulp.task('sass', function() {
	return gulp.src(paths.sass.src).pipe(plumber()).pipe(changed(paths.sass.dst)).pipe(sass({
		errLogToConsole : true
	})).pipe(gulp.dest(paths.sass.dst)).pipe(_if(!isWindows, notify('Sass compiled')));
});

gulp.task('js', function() {
	gulp.src(paths.allJS.src)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(babel({presets : ['es2015']}))     // transpile ES2015 to ES5 using ES2015 preset
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.allJS.dst))
		.pipe(_if(!isWindows, notify('JavaScript compiled')));
});

gulp.task('fonts', function() {
	gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dst));
});

gulp.task('images', function() {
	gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dst));
});

gulp.task('json', function() {
	gulp.src(paths.json.src).pipe(gulp.dest(paths.json.dst));
});

gulp.task('connect', function() {
	browserSync({
		open : true,
		server : {
			baseDir : "./build/"
		},
		port : 8080,
		/* Hide the notification. It gets annoying */
		notify : false,
		files : ["build/**/*.html", "build/js/main.js", "build/css/*.css"]
	});

});

gulp.task('clean', function() {
	return gulp.src('./build/', {
		read : false
	}).pipe(clean());
});

gulp.task('watch', ['connect'], function() {

	gulp.watch(paths.sass.src, ['sass']);
	gulp.watch(paths.jade.src, ['jade']);
	gulp.watch(paths.allJS.src, ['js']);
	gulp.watch(paths.json.src, ['json']);
});

gulp.task('default', function(cb) {
	runSequence(['connect', 'watch', 'jade', 'fonts', 'images', 'json'], cb);
});
