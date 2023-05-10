import gulp from "gulp";
import less from "gulp-less";
import postcss from "gulp-postcss";
import csso from "postcss-csso";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import preset from "postcss-preset-env";
import calc from "postcss-calc";
import sortMQ from "postcss-sort-media-queries";

import { isDev } from "./mode.mjs";

const pluginsPostCSS = [
  preset({
    features: {
      "image-set-function": false,
    },
  }),
  calc({ precision: 3 }),
];

const errorHandler = notify.onError((error) => ({
  title: "Компиляция стилей",
  message: error.message,
}));

const plumberOption = {
  errorHandler,
};

export function compileLess() {
  const isDevMode = isDev();

  !isDevMode &&
    pluginsPostCSS.push(
      sortMQ({
        sort: "mobile-first",
      }),
      csso()
    );

  return gulp
    .src("source/less/*.less", {
      sourcemaps: isDevMode,
    })
    .pipe(plumber(plumberOption))
    .pipe(less())
    .pipe(postcss(pluginsPostCSS))
    .pipe(
      gulp.dest("build/css", {
        sourcemaps: ".",
      })
    );
}
