import gulp from 'gulp';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import util from 'gulp-util';
import ghPages from 'gulp-gh-pages';

gulp.task('pg-js-comp', () => {
	return gulp.src([ 
			'./dist/components/init.jsx', 
			'./dist/components/shared/**/*.jsx',
			'./dist/components/route/**/*.jsx',
			'./dist/routes/index.jsx'
		])
		.pipe(concat('_comp.js', { newLine: ';\n\n' }))
		.pipe(babel())
		.pipe(gulp.dest('./dist/public/scripts'));
});

gulp.task('pg-js-vendor', () => {
	return gulp.src([ 
			'./bower_components/react/react.js', 
			'./bower_components/react-router/build/umd/ReactRouter.js',
			'./build/ripsaw.js'
		])
		.pipe(concat('_vendor.js'))
		.pipe(gulp.dest('./dist/public/scripts'));
});

gulp.task('pg-js', [ 'pg-js-vendor', 'pg-js-comp' ], () => {
	return gulp.src([
		'./dist/public/scripts/_vendor.js',
		'./dist/public/scripts/_comp.js'
	]).pipe(concat('site.js'))
		.pipe(util.env.production ? uglify() : util.noop())
		.pipe(gulp.dest('./dist/public/scripts'));
});

gulp.task('pg-css', () => {
	return gulp.src('./dist/assets/styles/site.scss')
		.pipe(sass('site.css'))
		.pipe(gulp.dest('./dist/public/styles'));
});

gulp.task('pg', [ 'pg-css', 'pg-js' ]);

gulp.task('pg-dev', () => {
	return gulp.watch('./dist/**/*', [ 'pg' ]);
});

gulp.task('pg-deploy', () => {
	return gulp.src(['./dist/index.html', './dist/public/**/*'])
		.pipe(ghPages());
});