var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var exec = require('child_process').exec;
var mocha = require('gulp-mocha');

gulp.task('default', function () {
    return gulp.src('kanikama.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./')
    );
});

gulp.task('compile_test', function () {
    return gulp.src('test/test.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./test/')
    );
});

gulp.task('test', ['coverage'],function () {
    return gulp.src('test/test.js', {read: false})
        .pipe(mocha());
});

gulp.task('coverage', ['compile_test','default'],function () {
    return exec('mocha -R html-cov > coverage.html', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('run', function () {
    return exec('coffee kanikama.coffee', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('watch', function(){
    return gulp.watch(['./kanikama.coffee','./test/test.coffee'], ['test']);
});