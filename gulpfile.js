let gulp = require('gulp'), // Подключаем Gulp
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'), // Подключаем Sass пакет
    pug = require('gulp-pug'), // Подключаем pug
    autoprefixer = require('gulp-autoprefixer');

let browserSync = require('browser-sync').create();

let pathBuild = './dist/';
let pathSrc = './src/';



gulp.task('sass', function () {
    return gulp.src(pathSrc + 'bootstrap/scss/**/*.+(sass|scss)')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(pathBuild + 'css'));
});

gulp.task('cleanCSSBuild', () => {
    return gulp.src(pathBuild + 'css/main.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(pathBuild + 'css/'))
});

gulp.task('pug', function () {
    gulp.src('src/pug/*.+(jade|pug)')
        .pipe(pug({pretty: '\t'}))
        .pipe(gulp.dest('dist/'))
});

gulp.task('js', function () {
    return gulp.src(pathSrc + 'js/**/*.js')
        .pipe(gulp.dest('dist/js'));
});




gulp.task('browserSync', () => {
    browserSync.init({
        server: pathBuild
    });
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.+(sass|scss)', ['sass', 'cleanCSSBuild']);
    gulp.watch('src/pug/**/*.+(jade|pug)', ['pug']);
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', [
    'js',
    'sass',
    'pug',
    'cleanCSSBuild',
    'watch',
    'browserSync',
]);