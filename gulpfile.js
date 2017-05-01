/*
 * Big shout out to these guys for showing the practical implications
 * https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/
*/

// Include Gulp
const gulp = require('gulp');


// Include Our Plugins
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');

const browserSync = require('browser-sync').create();

const coffeescript = require('gulp-coffeescript');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');

// These aren't explicitly in the README!
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');

/* INTERNAL ISSUE: not used */
const concat = require('gulp-concat');
const rename = require('gulp-rename');

// Compile Pug with linter
gulp.task('compile-pug', () => {
  // task goes here

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

// browserSync task
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'public',
    }
  });
});

// Compile our coffeescript
gulp.task('coffee', () => {
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffeescript())
    .pipe(uglify())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

// Compile sass
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

// watch
gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./src/pug/*.pug', ['lint-pug']);
  gulp.watch('./src/pug/*.pug', ['compile-pug']);
  gulp.watch('./src/style/*.scss', ['sass']);
  gulp.watch('./src/coffee/*.coffee',['coffee']);
});

// default gulp
gulp.task('default', ['compile-pug','sass','coffee','watch'], function () {
    // This will only run if the lint task is successful...
});

// onError method
function onError(err) {
  console.log(err);
  this.emit('end');
}

// EVERYTHING AFTER HERE IS NOT REFERENCED IN THE README
gulp.task('images', () => {
  return gulp.src('src/image/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('public/image'));
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
