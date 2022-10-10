const { src, dest, watch, parallel, series } = require('gulp');



const gulp           = require('gulp');
const scss           = require('gulp-sass')(require('sass'));
const concat         = require('gulp-concat');
const autoprefixer   = require('gulp-autoprefixer');
const uglify         = require('gulp-uglify');
const rename         = require('gulp-rename');
const imagemin       = require('gulp-imagemin');
const htmlmin        = require('gulp-htmlmin');
const del            = require('del');
const { notify }     = require('browser-sync');
const browserSync    = require('browser-sync').create();

function html() {
  return src('./**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./'));
};

function img() {
  return src('./images/**/*.*')
    .pipe(imagemin())
    .pipe(dest('./images/'))
};

function browsersync() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    notify: false
  })
}

function styles() {
  return src('./scss/*.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('./css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    './js/libs/*.js',
    './js/load_more.js',
    './js/menu.js',
    './js/main.js',
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('./js'))
  .pipe(browserSync.stream())
}

function dist() {
  return src([
    './**/*.html',
    './css/**/*.css',
    './js/main.min.js'
  ], {base: '.'})
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['./**/*.scss'], styles);
  watch(['./js/**/*.js', '!./js/main.min.js'], scripts);
  watch(['./**/*.html']).on('change', browserSync.reload);
}



exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.img = img;
exports.html = html;
exports.cleanDist = cleanDist;
exports.dist = series(cleanDist, dist);


exports.default = parallel(styles, scripts, browsersync, watching);