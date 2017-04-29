/*
 * Big shout out to these guys for showing the practical implications
 * https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/
*/

// including plugins
const gulp = require('gulp');
const pug = require('gulp-pug');

// task
gulp.task('compile-pug', () => {
  gulp.src('./src/pug/*.pug') // path to your file
    .pipe(pug())
    .pipe(gulp.dest('./public/html/'));
});

// pug
// minify html
// typescript
// javascript minify -- uglify
// scss/less files
// minify css
// hot reloading
