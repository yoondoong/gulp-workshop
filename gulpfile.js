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
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const pugLinter = require('gulp-pug-linter');

gulp.task('coffee', () => {
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffeescript())
    .pipe(uglify())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('compile-pug', () => {
  gulp.src('./src/pug/*.pug')
    .pipe(pug())
    .on('error', onError)
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('lint-pug', () => {
  return gulp
    .src('./src/pug/*.pug')
    .pipe(pugLinter())
    .pipe(pugLinter.reporter())
})

gulp.task('sass', () => {
  return gulp.src('./src/style/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .on('error', onError)
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./src/pug/*.pug', ['lint-pug']);
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

gulp.task('images', () => {
  return gulp.src('src/image/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('public/image'));
});


gulp.task('default', ['compile-pug','sass','coffee','watch'], function () {
    // This will only run if the lint task is successful...
});

/* if you have multiple js files linked to your html file,
   you can compress them into a single one 'main.min.js' file
gulp.task('useref', function(){
  return gulp.src('public/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});
*/

function onError(err) {
  console.log(err);
  this.emit('end');
}

// pug
// minify html
// typescript
// javascript minify -- uglify
// scss/less files
// minify css
// hot reloading
