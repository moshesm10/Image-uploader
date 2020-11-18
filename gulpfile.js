const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        //img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/scss/main.scss',
        //img: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        //img: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*'
    },
};

function html () {
    return gulp.src(path.src.html) 
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}))
}

function style () {
    return gulp.src(path.src.style)
            .pipe(sass())
            .pipe(gulp.dest(path.build.css))
            .pipe(browserSync.stream())
}

function script () {
    return gulp.src(path.src.js)
            .pipe(gulp.dest(path.build.js))
            .pipe(browserSync.reload({stream: true}))
}

function fonts () {
    return gulp.src(path.src.fonts)
            .pipe(gulp.dest(path.build.fonts))
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    })
    gulp.watch(path.watch.style, style);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.js, script);
    gulp.watch(path.watch.fonts, fonts);
}

exports.html = html;
exports.style = style;
exports.script = script;
exports.fonts = fonts;
exports.watch = watch;