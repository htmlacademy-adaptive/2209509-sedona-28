import gulp from "gulp";
import sharpResponsive from "gulp-sharp-responsive";
import cache from "gulp-cache";

const RE_SIZERS = [(image) => image.width, (image) => Math.ceil(image.width / 2)];
const SUFFIX = { suffix: "@2x" };
const OPTIONS = createOptionsFormat();

function processImages() {
	return gulp
		.src("source/img/**/*.{png,jpg}")
		.pipe(cache(sharpResponsive(OPTIONS)))
		.pipe(gulp.dest("build/img"));
}

function createOptionsFormat() {
	const formats = [];

	for (const format of [undefined, "avif", "webp"]) {
		formats.push(
			{
				width: RE_SIZERS[0],
				rename: SUFFIX,
				format,
			},
			{
				width: RE_SIZERS[1],
				format,
			}
		);
	}

	return {formats};
}

export { processImages };
