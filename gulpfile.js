var gulp = require('gulp');
var jsmin = require('gulp-uglify');
var cssmin = require('gulp-clean-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var jsx = require('gulp-angular-jsx');
var sourcemaps = require('gulp-sourcemaps');

var dirjs = [
    "src/componentes/minimaterial.js",
    "src/componentes/**/*.js"
];
var cssdir = [
    // 'src/componentes/minimaterial-colors.less',
    // 'src/componentes/minimaterial-functions.less',
    // 'src/componentes/minimaterial.less',
    'src/componentes/*.less',
    'src/componentes/**/*.less'
];
gulp.task('default', function () {
    gulp.watch(dirjs, ['js_task']);
    gulp.watch(cssdir, ['css_task']);
});

gulp.task('js_task', function () {
    gulp.src(dirjs)
        .pipe(plumber())
        .pipe(jsx())
        .pipe(concat('angular-minimaterial.js'))
        .pipe(gulp.dest('./'))
        .pipe(jsmin())
        .pipe(sourcemaps.init())
        .pipe(concat('angular-minimaterial.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
        .pipe(gulp.dest('./docs/'));
});

gulp.task('css_task', function () {
    gulp.src(cssdir)
        .pipe(plumber())
        .pipe(less())
        // .pipe(concat('angular-minimaterial.less'))
        .pipe(concat('angular-minimaterial.css'))
        .pipe(gulp.dest('./'))
        .pipe(cssmin())
        .pipe(concat('angular-minimaterial.min.css'))
        .pipe(gulp.dest('./'))
        .pipe(gulp.dest('./docs/'));
});