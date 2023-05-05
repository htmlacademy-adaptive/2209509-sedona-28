import gulp from "gulp";
import svgo from "gulp-svgmin";
import { stacksvg } from "gulp-stacksvg";
import { readdir } from "fs/promises";

const ICONS_PATH = "source/icons";
const DEST_PATH = "build/img";
function optimizeVector () {
	return gulp
		.src("source/img/**/*.svg")
		.pipe(svgo())
		.pipe(gulp.dest(DEST_PATH));
}

async function createStack() {
	const folders = await readdir(ICONS_PATH);

	return folders.forEach((folder) =>
		gulp
			.src(`${ICONS_PATH}/${folder}/*.svg`)
			.pipe(svgo())
			.pipe(
				stacksvg({
					output: `${folder}.svg`,
				})
			)
			.pipe(gulp.dest(DEST_PATH))
	);
}

export { optimizeVector, createStack };
