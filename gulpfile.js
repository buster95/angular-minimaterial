var gulp = require('gulp');
var jsmin = require('gulp-uglify');
var cssmin = require('gulp-clean-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var less = require('gulp-less');

var dirjs = [
    "src/componentes/angular-mymaterial.js",
    "src/componentes/angular-mymaterial-*.js"
];
var cssdir = [
    'src/styles/*.less'
];
gulp.task('default', function () {
    gulp.watch(dirjs, ['js_task']);
    gulp.watch(cssdir, ['css_task']);
});

gulp.task('js_task', function () {
    gulp.src(dirjs)
        .pipe(plumber())
        .pipe(concat('mmAngular.js'))
        .pipe(gulp.dest('src/'))
        .pipe(jsmin())
        .pipe(concat('mmAngular.min.js'))
        .pipe(gulp.dest('src/'));
});

gulp.task('css_task', function () {
    gulp.src(cssdir)
        .pipe(plumber())
        .pipe(less())
        .pipe(concat('mmAngular.css'))
        .pipe(gulp.dest('src/'))
        .pipe(cssmin())
        .pipe(concat('mmAngular.min.css'))
        .pipe(gulp.dest('src/'));
});