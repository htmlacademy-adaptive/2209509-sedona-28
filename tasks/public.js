import gulp from "gulp";

export const copyAssets = () => gulp.src("source/public/**/*").pipe(gulp.dest("build"));
