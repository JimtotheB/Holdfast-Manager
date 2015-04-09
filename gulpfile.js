var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var browserify = require('browserify');
var jade = require('gulp-jade');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var path = require('path');


var jadePaths = {
  input: path.join(__dirname, './lib/Client/**/partials/*.jade'),
  output: path.join(__dirname, './lib/Server/Public/html')
}

var clientPaths = {
  name: 'Holdfast.js',
  nameMin: 'Holdfast.min.js',
  input: path.join(__dirname, './lib/Client/'),
  output: path.join(__dirname, './lib/Server/Public/js/')
}

var bundle = function(watch) {

  var bundler = browserify({
    basedir: clientPaths.input,
    extensions: [".js", ".json"],
    cache: {},
    packageCache: {},
    fullPaths: false,
    debug: true
  });

  if (watch) {
    bundler = watchify(bundler, {verbose: true});
  }

  bundler.add('./'+clientPaths.name);
  var runBundle = function() {
    return bundler.bundle()
      .on("error", function(err) {
      gutil.log("Browserify Error", err);
      return this.emit("end");
    })
    .pipe(source(clientPaths.name))
    .pipe(gulp.dest(clientPaths.output))
    .pipe(buffer())
    .pipe(ngAnnotate({
      add: true,
      single_quotes: true
    }))
    .pipe(uglify())
    .pipe(rename(clientPaths.nameMin))
    .pipe(gulp.dest(clientPaths.output));
  };
  bundler
    .on("update", runBundle)
    .on("log", gutil.log.bind(gutil, gutil.colors.cyan('Browserify')));
  return runBundle();
};

gulp.task('build_client', function(){
  return bundle(false);
});

gulp.task('watch_client', function() {
  return bundle(true);
})

gulp.task('watch_jade', function() {
  return watch(jadePaths.input, function() {
    gulp.src(jadePaths.input)
      .pipe(plumber())
      .pipe(jade())
      .pipe(rename(function(path) {
        var upDir = path.dirname.split('partials')[0].replace(/^(?:\.\.\/)+/ , "").toLowerCase()
        var module =  upDir.split('/')
        module.splice(module.length - 1, 1)
        upDir = module[module.length - 1]
        path.extname = ""
        path.dirname = upDir
      }))
      .pipe(templateCache({standalone: true, moduleSystem: 'Browserify', module: 'Holdfast.templates'}))
      .pipe(gulp.dest(clientPaths.input + '/_compiled'));
  });
});

gulp.task('default', ['watch_jade', 'watch_client']);