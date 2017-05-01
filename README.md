# Gulp Workshop

Task runners like Gulp automate most all of the legwork that comes from customizing your webdev toolkit. Here, you will tie together many cool technologies that we have learned from other workshops. We can convert pug into HTML, SASS into CSS, CoffeeScript into JavasScript, and we still get hot reloading and linting.

*Note*: Gulp helps you pick whatever tools you want to use. For the purposes of this tutorial, we wanted to apply a lot of what we've learned in previous workshops. But gulp has [thousands of plugins](http://gulpjs.com/plugins/), of which Pug and CoffeScript support are just two.

## Using Methods in Gulp
Gulp only has four core methods: **task**, **src**, **dest**, and **watch**. The rest will be run through plugins. This makes gulp customizable, and its simplicity explains its gaining popularity among developers.

- **task**: Defines a new task. This method takes two arguments, the name of the task, and a callback function to run the actual task.
- **src**: Sets the folder where source files are located
- **dest**: Sets the destination folder where build files will be placed
- **watch**: Monitors source files and run an appropriate task(s) whenever a file is changed

Additionally, gulp makes heavy use of the **pipe** method. This takes the data from the previous command and uses it in the next action.

## Get Started
:fork_and_knife: Fork this repo and clone the copy as usual! Open up terminal and go to your local copy.

## Setting up gulp

:computer: **Run these two commands in your project directory to install gulp globally and then locally:**

`npm install -g gulp`
`npm install --save-dev gulp`

Much like how node gets marching orders from `package.json`, gulp reads all of its instructions from `gulpfile.js`.

:rocket: Open **`gulpfile.js`** Let's make sure that we can use gulp. Under where it says `//Include Gulp`, add:

:rocket: `const gulp = require('gulp');`

Great! Now on to the plugins that we'll need.

## Adding plugins


### Pug

First, let's download the dependencies. We'll need `gulp-pug` and `gulp-pug-linter`, which checks for errors in your Pug file.

:computer: `npm install --save-dev gulp-pug gulp-pug-linter`

:rocket: Under the comment `// Include Our Plugins`, add the following:

```
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');
```

:rocket: Now we'll write our first **task**. Here's the outline, which you can add under the comment `// Compile Pug with linter`:
```
gulp.task('compile-pug', () => {
    // task goes here

})
```
We have ourselves a task! But it doesn't do anything. Inside that anonymous function, we want to
 - find all the `.pug` files,
 - run them through the `pug` plugin that we installed
 - freak out if there's an error, and
 - save our new `.html` files to the destination directory `/public`.

Gulp makes this super easy.


:rocket: Add this inside that anonymous function

```
  gulp.src('./src/pug/*.pug')
    .pipe(pug())
    .on('error', onError)
    .pipe(gulp.dest('./public'))
```
What is this `onError` method referring to? Great question. Let's add it after the `// onError method` comment.

```
function onError(err) {
  console.log(err);
  this.emit('end');
}
```

The **onError** function prevents the default gulp command from exiting if there are errors in the Pug file (which can be annoying if you would like gulp to run continuously while you're working).

What about that linter we installed? Let's make a task for that, too.

:rocket: Below the 'compile-pug' task, add
```
gulp.task('lint-pug', () => {
  return gulp
    .src('./src/pug/*.pug')
    .pipe(pugLinter())
    .pipe(pugLinter.reporter())
})
```
We can reference any task by typing `gulp <task-name>` in terminal. Let's compile our Pug!

:computer: `gulp compile-pug`

Now you should be able to see the html file in your ./public folder :+1:

To play with the linter, you can try typing in some invalid syntax into your Pug file and run `gulp compile-pug`. The task will pause (but not terminate), and your linter will tell you where the error is in terminal. You can go ahead and correct the Pug file, and the task will continue automatically. (Cool!)

----

### browserSync

We'll use browserSync for easy local testing. Let's download the plugin:

:computer: `npm install --save-dev browser-sync`

And add this to the top of gulpfile.js (where all of the dependencies live):

`const browserSync = require('browser-sync');`

*Note*: browser-sync is not a gulp plugin, so it doesn't have a `gulp-` in front of its name. That said, it works really well with gulp.

:rocket: Now let's make browserSync into a third gulp task. Find `// browserSync task`  and add
```
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'public',
    }
  });
});
```
We specify the base directory as `public` because that's where we asked gulp to pipe the compiled files.

Try running
:computer: `gulp browserSync`
to see your website locally hosted (a browser window should pop up)!

Let's take it a step further. It's nice if we don't have to call browserSync every time we compile our pug file, right? Let's add browseSync into our `compile-pug` task like so:

:rocket: Append another pipe inside the `compile-pug` method directly after `.pipe(gulp.dest('./public'))`:
```
.pipe(browserSync.reload({
      stream: true,
    }));
```
Now you can testing it! In the Pug file, let's change `h1 Hey there, CS52` to `h1 Welcome to the Gulp workshop!`. After you save the change, call `gulp compile-pug` again and call `gulp browserSync`. The browser window will pop up, reflecting the change you just made!

-----

### CoffeeScript

What if we want our page to be interactive? We need some sort of JavaScript. We wrote a `.coffee` file so need to compile it. `gulp-coffescript` can achieve this for us easily! And `gulp-uglify` minimizes the resulting `.js` file nicely!

First download the plugins:
:computer: `npm install --save-dev gulp-coffeescript gulp-uglify`

:rocket: And add them as dependencies
```
const coffeescript = require('gulp-coffeescript');
const uglify = require('gulp-uglify');
```

:rocket: Under `// Compile our coffeescript` add a new task:

```
gulp.task('coffee', () => {
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffeescript())
    .pipe(uglify())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});
```
What's going on?
 1. grab all the `.coffee` files from the `/src/coffee` directory,
 2. pipe the files through the `coffeescript` plugin, which compiles it to JavaScript,
 3. pipe that JavaScript to `uglify` to minimize it,
 4. save it to the `/public` directory, and
 5. tell browserSync to reload the page (like we did with Pug)

Now in your terminal, run:
:computer: `gulp coffee`

Go have a look at the `/public` directory and open the shiny, new `.js` file. It's smushed into one line to make the file size smaller. Now when you run `gulp browserSync` again, you can click on the button and get a random word!

---

### SASS

Finally, we need style to prettify our website!

Let's download the plugin:
:computer: `npm install --save-dev gulp-sass gulp-cssnano`

:rocket: Gotta add those dependencies
```
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
```
What are they used for? `sass` compiles our `.scss` files into css files, and `cssnano` minimizes CSS files.

:rocket: Time for another gulp task. Under `// Compile sass` add:
```
gulp.task('sass', () => {
  return gulp.src('./src/style/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(cssnano())
    .on('error', onError)
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});
```
Run it with
:computer: `gulp sass`

There are lots of similarities between all of these tasks (that's what developers love about gulp). However, let us know if anything doesn't make sense.

## Bring it all together

Now we have all the source files compiled and minimized. But we still have to call `gulp sass`, `gulp compile-pug`, and `gulp coffee` to compile after we make changes. Lame! So let's tell gulp to listen for changes and call those tasks us.

:rocket: Under **"// watch"** add a new task:
```
gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./src/pug/*.pug', ['lint-pug', 'compile-pug']);
  gulp.watch('./src/style/*.scss', ['sass']);
  gulp.watch('./src/coffee/*.coffee',['coffee']);
});
```
This method watches our files and invokes another gulp task if changes occurred. For instance, if you change a `.pug` file in the folder `/src/pug/`, we ask it to run the gulp tasks `lint-pug` and `compile-pug`.

See that we put the `['browserSync']` parameter in the method? It'll be cumbersome to open up two command line windows and run `gulp browserSync` and `gulp watch` separately, so here we make them run together by specifying that `browserSync` must have completed before `watch` is allowed to run.

Now you can type in the command line
:computer: `gulp watch`,
and if you make a change to one of you source files, your website will be reloaded automatically.

:+1: Awesome copying and pasting skills. We are ready to see our product! Finally, let's write the default task, which we want to compile all the files.

:rocket: Under `// default gulp`, add:
```
gulp.task('default', ['compile-pug','sass','coffee','watch'], function () {
    // This will only run if the lint task is successful...
});
```

To call the default task, just run

:computer: `gulp`

You ought to have a finished product that looks something like this:

![final website](/images/final.png)

and automatically updates if you change any `.coffee`, `.scss`, or `.pug` file.

## Finished!
At this point you should have ...
- [ ] installed gulp (globally and in the repo)
- [ ] added external plugins
- [ ] compiled and minified all of the files in `src/`
- [ ] hot reloading for local testing
- [ ] error checking
- [ ] an understanding of how cool gulp is!
