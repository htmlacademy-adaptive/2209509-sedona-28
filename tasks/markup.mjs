import gulp from 'gulp';

export const html = () =>  gulp.src('source/*.html')
  .pipe(gulp.dest('build'));
