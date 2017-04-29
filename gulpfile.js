/*
 * Big shout out to these guys for showing the practical implications
 * https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/
*/

// including plugins
const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const coffeescript = require('gulp-coffeescript');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffeescript())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('compile-pug', () => {
  gulp.src('./src/pug/*.pug') // path to your file
    .pipe(pug())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('sass', () => {
  return gulp.src('./src/style/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./src/pug/*.pug', ['compile-pug']);
  gulp.watch('./src/style/*.scss', ['sass']);
  gulp.watch('./src/coffee/*.coffee',['coffee']);
});


gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'public',
    }
  });
});

gulp.task('useref', () => {
  return gulp.src('public')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
});

// pug
// minify html
// typescript
// javascript minify -- uglify
// scss/less files
// minify css
// hot reloading
