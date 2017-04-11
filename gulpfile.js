var gulp = require('gulp');
var jsmin = require('gulp-uglify');
var cssmin = require('gulp-clean-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var jsx = require('gulp-angular-jsx');

var dirjs = [
    "src/componentes/minimaterial.js",
    "src/componentes/minimaterial-*.js"
];
var cssdir = [
    'src/styles/minimaterial.less',
    'src/styles/minimaterial-*.less'
];
gulp.task('default', function () {
    gulp.watch(dirjs, ['js_task']);
    gulp.watch(cssdir, ['css_task']);
});

gulp.task('js_task', function () {
    gulp.src(dirjs)
        .pipe(plumber())
        .pipe(concat('angular-minimaterial.js'))
        .pipe(gulp.dest('src/'))
        .pipe(jsmin())
        .pipe(concat('angular-minimaterial.min.js'))
        .pipe(gulp.dest('src/'))
        .pipe(gulp.dest('docs/'));
});

gulp.task('css_task', function () {
    gulp.src(cssdir)
        .pipe(plumber())
        .pipe(concat('angular-minimaterial.less'))
        .pipe(less())
        .pipe(concat('angular-minimaterial.css'))
        .pipe(gulp.dest('src/'))
        .pipe(cssmin())
        .pipe(concat('angular-minimaterial.min.css'))
        .pipe(gulp.dest('src/'))
        .pipe(gulp.dest('docs/'));
});