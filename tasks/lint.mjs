import gulp from "gulp";
import bemlinter from "gulp-html-bemlinter";
import { htmlValidator } from "gulp-w3c-html-validator";

const ALL_HTML = `build/*.html`;

const validateMarkup = () =>
  gulp
    .src(ALL_HTML)
    .pipe(htmlValidator.analyzer({ ignoreLevel: "info" }))
    .pipe(htmlValidator.reporter({ throwErrors: true }));

const lintBEM = () => gulp.src(ALL_HTML).pipe(bemlinter());

export const lintMarkup = gulp.series(validateMarkup, lintBEM);
