const {src, dest, watch, series} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sync = require('browser-sync').create()
const csso = require('csso')
const concat = require('gulp-concat')
const include = require('gulp-file-include')

function html () {
    return src('src/html/**.html')
}

function scss () {
    return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(dest('dist/css'))
}

function serve() {
    sync.init({
        server: '/dist'
    })
    watch('src/html/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}

function server () {

    sync.init({
        server: "./src/html"
    });

    watch("src/scss/**.scss");
    watch("src/*.html").on('change', sync.reload);
}

exports.server = server
exports.serve = series(scss)
exports.scss = scss 