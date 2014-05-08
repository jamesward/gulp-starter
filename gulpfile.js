var gulp = require("gulp"),
  path = require("path"),
  bower = require("bower"),
  connect = require("connect"),
  gulpIgnore = require("gulp-ignore"),
  gutil = require("gulp-util"),
  autoprefixer = require("gulp-autoprefixer"),
  less = require("gulp-less"),
  livereload = require("gulp-livereload"),
  jshint = require("gulp-jshint"),
  uglify = require("gulp-uglify"),
  imagemin = require("gulp-imagemin"),
  rename = require("gulp-rename"),
  clean = require("gulp-clean"),
  concat = require("gulp-concat"),
  newer = require("gulp-newer"),
  pkg = require("./package.json");

var SRC  = "app";

var SRC_LESS_BASE  = SRC + "/less";
var SRC_JAVASCRIPT_BASE  = SRC + "/js";
var SRC_IMAGES_BASE  = SRC + "/img";

var SRC_ALL  = SRC + "/**";
var SRC_RAW  = SRC + "/raw/**";
var SRC_LESS_ALL  = SRC_LESS_BASE + "/**/*.less";
var SRC_JAVASCRIPT_ALL  = SRC_JAVASCRIPT_BASE + "/**/*.js";
var SRC_IMAGES_ALL  = SRC_IMAGES_BASE + "/**/*";

var DIST = "dist";
var DIST_LIB = DIST + "/lib";
var DIST_ALL = DIST + "/**";
var DIST_LESS = DIST + "/css";
var DIST_JAVASCRIPT = DIST + "/js";
var DIST_IMAGES = DIST + "/img";

var MAIN_SCRIPT = "index.js";



// Styles

gulp.task("compile:less", ["update"], function() {
  return gulp.src(SRC_LESS_ALL)
    .pipe(less({ paths: [ path.join(SRC_LESS_BASE, "includes") ] }))
    .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
    .pipe(gulp.dest(DIST_LESS));
});

gulp.task("dist:less", ["compile:less"], function() {
  return gulp.src(MAIN_STYLE)
    .pipe(rename({ suffix: ".min" }))
    .pipe(minifycss())
    .pipe(gulp.dest(DIST_LESS));
});


// JavaScripts

gulp.task("compile:javascript", ["update"], function() {
  return gulp.src(SRC_JAVASCRIPT_ALL)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat(MAIN_SCRIPT))
    .pipe(gulp.dest(DIST_JAVASCRIPT));
});

gulp.task("dist:javascript", ["compile:javascript"], function() {
  return gulp.src(SRC_JAVASCRIPT_ALL)
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest(DIST_JAVASCRIPT));
});


// Images

gulp.task("compile:images", ["update"], function() {
  return gulp.src(SRC_IMAGES_ALL)
    .pipe(gulp.dest(DIST_IMAGES));
});

gulp.task("dist:images", function() {
  return gulp.src(SRC_IMAGES_ALL)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(DIST_IMAGES));
});


// Copy the raw assets
gulp.task("copy-raw", ["update"], function() {
  return gulp.src(SRC_RAW)
    .pipe(gulp.dest(DIST));
});


// Copy
gulp.task("copy-bower", ["update"], function() {
  return gulp.src("bower_components/**")
    .pipe(gulp.dest(DIST_LIB));
});


// Compile everything
gulp.task("compile", ["copy-bower", "copy-raw", "compile:less", "compile:javascript", "compile:images"]);


// Dist everything
gulp.task("dist", ["dist:less", "dist:javascript", "dist:images"]);


// Clean the DIST dir
gulp.task("clean", function() {
  return gulp.src(DIST, {read: false})
    .pipe(clean());
});


// Updates the Bower dependencies based on the bower.json file
gulp.task("update", function(next) {

  var needsUpdate = false;

  gulp.src("bower.json")
    .pipe(newer(".build"))
    .pipe(gulp.dest(".build")) // todo: don't do this if the bower install fails
    .on("close", function() {
      if (!needsUpdate) {
        next();
      }
    })
    .on("error", function(error) {
      if (!needsUpdate) {
        next(error);
      }
    })
    .on("data", function() {
      // updated bower.json
      needsUpdate = true;
      gutil.log("Updating Bower Dependencies");
      bower.commands.install([], {}, { interactive: false })
        .on("end", function (installed) {
          gutil.log("Bower Dependencies Updated");
          next();
        })
        .on("log", function (log) {
          if (log.level == "action" && log.id == "install") {
            gutil.log("Added Bower Dependency: " + log.message);
          }
        })
        .on("error", function (error) {
          gutil.error("Bower Error:", error);
          //next(error);
        });
    })
});


// Server that serves static content from DIST
gulp.task("server", ["compile"], function(next) {
  var port = process.env.PORT || 5000;
  var server = connect();
  server.use(connect.static(DIST)).listen(port, next);
  gutil.log("Server up and running: http://localhost:" + port);
});


// Auto-Reloading Development Server
gulp.task("dev", ["server"], function() {

  gulp.watch(SRC_ALL, ["compile"]);
  gulp.watch("bower.json", ["copy-bower"]);

  var lrserver = livereload();

  gulp.watch(DIST_ALL).on("change", function(file) {
    lrserver.changed(file.path);
  });

});


// Prod Server
gulp.task("prod", ["server", "dist"]);


// Help
gulp.task("help", function(next) {
  gutil.log("--- " + pkg.name + " ---");
  gutil.log("");
  gutil.log("See all of the available tasks:");
  gutil.log("$ gulp -T");
  gutil.log("");
  gutil.log("Run a dev mode server:");
  gutil.log("$ gulp dev");
  gutil.log("");
  gutil.log("Run a prod mode server:");
  gutil.log("$ gulp prod");
  next();
});


// Default
gulp.task("default", ["help"]);



/*
 .pipe(refresh(lrserver));
 */

/*
 gulp.task("lint", function() {
 return gulp.src("asdf")
 .pipe(jshint())
 .pipe(jshint.reporter("jshint-stylish"))
 .pipe(jshint.reporter("fail"));
 });
 */
