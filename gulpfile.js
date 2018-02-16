var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('./src/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./docs/'));
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.scss',function () {
        setTimeout( function () {
            gulp.start('styles');
        }, 500);
    });
});

gulp.task('default', ['styles','watch']);