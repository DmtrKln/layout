const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function html() {
  return gulp.src('src/*.html')
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function styles() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function imagesIcon() {
  return gulp.src('src/img/icons/**/*')
    .pipe(gulp.dest('dist/img/icons'));
}

function imagesMain() {
  return gulp.src('src/img/main/**/*')
    .pipe(gulp.dest('dist/img/main'));
}

function server() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });
}
function watchFiles() {
  gulp.watch('src/**/*.html', html).on('change', browserSync.reload);
  gulp.watch('src/scss/**/*.scss', styles).on('change', browserSync.reload);
  gulp.watch('src/img/icons/**/*', imagesIcon).on('change', browserSync.reload);
  gulp.watch('src/img/main/**/*', imagesMain).on('change', browserSync.reload);
}
exports.html = html;
exports.imagesIcon = imagesIcon;
exports.imagesMain = imagesMain;
exports.styles = styles;

exports.default = gulp.series(
  html,
  imagesIcon,
  imagesMain,
  styles,
  gulp.parallel(server, watchFiles)
);