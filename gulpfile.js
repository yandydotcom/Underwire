var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync');
    debug = require('gulp-debug');

/* pathConfig*/
var jsEntryPoint = './src/underwire.js',
    sassEntryPoint = './src/underwire.scss',
    browserDir = './docs/',
    sassWatchPath = './src/core/**/*.scss',
    jsWatchPath = './src/core/**/*.js',
    htmlWatchPath = './**/*.html';
/**/

gulp.task('js', function () {
    return browserify(jsEntryPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('underwire.js'))
        .pipe(debug({title: 'js:'}))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./docs/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    const config = {
        server: {baseDir: browserDir}
    };

    return browserSync(config);
});

gulp.task('sass', function () {
    return gulp.src(sassEntryPoint)
        .pipe(debug({title: 'scss:'}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./docs/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js']);
    gulp.watch(sassWatchPath, ['sass']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

gulp.task('run', ['js', 'sass', 'watch', 'browser-sync']);
gulp.task('default', ['run']);