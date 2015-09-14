import gulp from 'gulp';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import rename from 'gulp-rename';

gulp.task('pg', () => {
	return gulp.src([ './gh-pages/components/init.jsx', './gh-pages/components/shared/**/*.jsx' ])
		.pipe(concat('comp.js'))
		.pipe(babel())
		.pipe(gulp.dest('./gh-pages/public/'));
});