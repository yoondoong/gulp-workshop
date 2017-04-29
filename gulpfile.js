/*
 * Big shout out to these guys for showing the practical implications
 * https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/
*/

// including plugins
const gulp = require('gulp');
const sass = require('gulp-sass');

// task
gulp.task('compile-style', () => {
  gulp.src('./src/*.scss') // path to your file
    .pipe(sass())
    .pipe(gulp.dest('./public/'));
});

// pug
// minify html
// typescript
// javascript minify -- uglify
// scss/less files
// minify css
// hot reloading
