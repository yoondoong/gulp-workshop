/*
 * Big shout out to these guys for showing the practical implications
 * https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/
*/

// Include Gulp


// Include Our Plugins


// Compile Pug with linter


// browserSync task


// Compile our coffeescript



// Compile sass



// watch


// default gulp


// onError method


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
