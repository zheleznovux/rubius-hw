const { src, dest, task, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const webpackStream = require('webpack-stream');
const rename = require('gulp-rename');


function buildSass() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([
            autoprefixer({
                grid: true,
                overrideBrowserslist: ['last 2 versions'],
            }),
             cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
}

function browsersync()
{
    browserSync.init({
        server: 'src/',
        notify: false,
    });
}

function html() {
    return  src('src/**/*.html')
            .pipe(dest('dist/'))
            .pipe(browserSync.stream());
}

function js() {
    return  src('src/index.js')
            .pipe(webpackStream(require('./webpack.config.js')))
            .pipe(rename('main.min.js'))
            .pipe(dest('src/js'))
            .pipe(dest('dist/js'))
            .pipe(browserSync.stream());
}

function liveServer()
{
    watch('src/scss/**/*.scss', buildSass);
    watch(['src/js/**/*.js', '!src/js/**/*.min.js'], js);
    watch('src/**/*.html',html);
}

function copy()
{
    return src(['src/images/**/*.*', 'src/css/**/*.scc'], {
        base: 'src/',
    }).pipe(dest('dist'));
}

function cleanDist() 
{
    return del('dist/**/*', {force: true});
}

exports.liveServer = liveServer;
exports.buildSass = buildSass;

exports.build = series(cleanDist, buildSass, html, js, copy);
exports.default = series([buildSass, js], parallel(browsersync, liveServer));