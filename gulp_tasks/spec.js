import gulp from 'gulp';
import concat from 'gulp-concat';
import jasmine from 'gulp-jasmine';
import reporters from 'jasmine-reporters';

gulp.task('spec', () => {

	return gulp.src([ './build/ripsaw.js', './spec/**/*' ])
		.pipe(concat('test_file.js'))
		.pipe(gulp.dest('./tmp/'))
		.pipe(jasmine({ reporter: reporters.JUnitXmlReporter() }));

});