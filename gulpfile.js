import gulp from "gulp";
import { setDev, setProd } from "./tasks/mode.mjs";
import { initialBuild, startServer } from "./tasks/serve.mjs";
import { cleanBuild } from "./tasks/clean.mjs";
import cache from "gulp-cache";
export { lintMarkup as lint } from "./tasks/lint.mjs";

export default gulp.series(setDev, initialBuild, startServer);
export const build = gulp.series(cleanBuild, setProd, initialBuild);
export const clearCache = cache.clearAll;
