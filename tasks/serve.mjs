import gulp from "gulp";
import browserSync from "browser-sync";
import { copyAssets } from "./public.js";
import { compileLess } from "./styles.mjs";
import { processImages } from "./images.mjs";
import { createStack, optimizeVector } from "./svg.mjs";
import { html } from "./markup.mjs";

const server = browserSync.create();

/**
 * @type {browserSync.Options}
 */
const SERVER_OPTIONS = {
  server: "build",
  notify: true,
  open: true,
  cors: true,
  watch: true,
};

const streamStyles = () => compileLess().pipe(server.stream());

async function serve() {
  server.init(SERVER_OPTIONS);

  gulp.watch("source/**/*.html", gulp.series(html, server));
  gulp.watch("source/public/**/*", copyAssets);
  gulp.watch("source/less/**/*.less", streamStyles);
  gulp.watch("source/img/**/*.{png,jpg}", processImages);
  gulp.watch("source/img/**/*.svg", optimizeVector);
  gulp.watch("source/icons/**/*.svg", createStack);
}

const initialBuild = gulp.parallel(
  html,
  copyAssets,
  compileLess,
  processImages,
  createStack,
  optimizeVector
);
const startServer = gulp.series(initialBuild, serve);

export { initialBuild, startServer };
