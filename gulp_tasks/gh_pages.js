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
			'./gh-pages/components/init.jsx', 
			'./gh-pages/components/shared/**/*.jsx',
			'./gh-pages/components/route/**/*.jsx',
			'./gh-pages/routes/index.jsx'
		])
		.pipe(concat('_comp.js', { newLine: ';\n\n' }))
		.pipe(babel())
		.pipe(gulp.dest('./gh-pages/public/scripts'));
});

gulp.task('pg-js-vendor', () => {
	return gulp.src([ 
			'./bower_components/react/react.js', 
			'./bower_components/react-router/build/umd/ReactRouter.js',
			'./build/ripsaw.js'
		])
		.pipe(concat('_vendor.js'))
		.pipe(gulp.dest('./gh-pages/public/scripts'));
});

gulp.task('pg-js', [ 'pg-js-vendor', 'pg-js-comp' ], () => {
	return gulp.src([
		'./gh-pages/public/scripts/_vendor.js',
		'./gh-pages/public/scripts/_comp.js'
	]).pipe(concat('site.js'))
		.pipe(util.env.production ? uglify() : util.noop())
		.pipe(gulp.dest('./gh-pages/public/scripts'));
});

gulp.task('pg-css', () => {
	return gulp.src('./gh-pages/assets/styles/site.scss')
		.pipe(sass('site.css'))
		.pipe(gulp.dest('./gh-pages/public/styles'));
});

gulp.task('pg', [ 'pg-css', 'pg-js' ]);

gulp.task('pg-dev', () => {
	return gulp.watch('./gh-pages/**/*', [ 'pg' ]);
});

gulp.task('pg-deploy', () => {
	return gulp.src(['./gh-pages/index.html', './gh-pages/public/**/*'])
		.pipe(ghPages());
});