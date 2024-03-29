import gulp from "gulp";
import plumber from "gulp-plumber";
import less from "gulp-less";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import { htmlValidator } from "gulp-w3c-html-validator";
import bemlinter from "gulp-html-bemlinter"

import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgmin";
import browser from "browser-sync";
// Styles

export const styles = () => {
  return gulp.src("source/less/style.less", { sourcemaps: true })
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
  autoprefixer(),
  csso()
  ]))
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css", { sourcemaps: "." }))
  .pipe(browser.stream());
  }

// HTML

const html = () => {
return gulp.src("source/*.html")
.pipe(gulp.dest("build"));
}

// Images

const optimizeImages = () => {
return gulp.src("source/img/**/*.{png,jpg}")
.pipe(squoosh())
.pipe(gulp.dest("build/img"))
}

const copyImages = () => {
return gulp.src("source/img/**/*.{png,jpg}")
.pipe(gulp.dest("build/img"))
}

// Copy

const copy = (done) => {
  gulp.src([
  "source/fonts/**/*.{woff2,woff}",
  "source/*.ico",
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
  }

  // WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(squoosh({
  webp: {}
  }))
  .pipe(gulp.dest("build/img"))
  }

  // SVG

const svg = () =>
gulp.src(["source/img/*.svg", "!source/img/icons/*.svg"])
.pipe(svgo())
.pipe(gulp.dest("build/img"));

// Clean

import { deleteAsync } from "del";

export const cleanBuild = async () => await deleteAsync("build");


// lint

const ALL_HTML = "build/*.html";

export const lint = () =>
	gulp
		.src(ALL_HTML)
		.pipe(htmlValidator.analyzer({ ignoreLevel: "info" }))
		.pipe(htmlValidator.reporter({ throwErrors: true }));

export const lintBEM = () => gulp.src(ALL_HTML).pipe(bemlinter());

// Server

const server = (done) => {
browser.init({
server: {
baseDir: "build"
},
cors: true,
notify: false,
ui: false,
});
done();
}

// Reload

const reload = (done) => {
browser.reload();
done();
}

// Watcher

const watcher = () => {
gulp.watch("source/less/**/*.less", gulp.series(styles));
gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

export const build = gulp.series(
cleanBuild,
copy,
lint,
lintBEM,
optimizeImages,
gulp.parallel(
styles,
html,
svg,
createWebp
),
);

// Default

export default gulp.series(
cleanBuild,
copy,
copyImages,
gulp.parallel(
styles,
html,
svg,
createWebp
),
gulp.series(
server,
watcher
));
