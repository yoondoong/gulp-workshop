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

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffeescript({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/js')).
    .pipe(browserSync.reload({
      stream: true,
    }));
});


gulp.task('compile-pug', () => {
  gulp.src('./src/pug/*.pug') // path to your file
    .pipe(pug())
    .pipe(gulp.dest('./public/html/'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('sass', () => {
  return gulp.src('./src/style/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('./public/style'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./src/pug/*.pug', ['compile-pug']);
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'public/html',
    }
  });
});

// pug
// minify html
// typescript
// javascript minify -- uglify
// scss/less files
// minify css
// hot reloading
