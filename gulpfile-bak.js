var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('styles', function() {
    gulp.src('./src/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./docs/'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./docs/**/*.html')
        .pipe(connect.reload());
});

gulp.task('watch-scss', function () {
    gulp.watch('./src/**/*.scss',function () {
        setTimeout( function () {
            gulp.start('styles');
        }, 500);
    });
});

gulp.task('watch-html', function () {
    gulp.watch('./docs/**/*.html',function () {
        setTimeout( function () {
            gulp.start('html');
        }, 500);
    });
});

gulp.task('connect', function() {
    connect.server({
        root: 'docs',
        livereload: true
    });
});

gulp.task('default', ['styles', 'connect', 'watch']);
gulp.task('build', ['styles']);
gulp.task('watch', ['watch-scss','watch-html']);