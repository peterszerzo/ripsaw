import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

import config from './config.js';

gulp.task('js', () => {
	return gulp.src(config.jsSource)
		.pipe(concat('ripsaw.js'))
		.pipe(gulp.dest('./build/'))
		.pipe(uglify())
		.pipe(rename('ripsaw.min.js'))
		.pipe(gulp.dest('./build/'));
});