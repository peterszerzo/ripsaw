import gulp from 'gulp';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import sass from 'gulp-sass';

gulp.task('pg-js-comp', () => {
	return gulp.src([ 
			'./gh-pages/components/init.jsx', 
			'./gh-pages/components/shared/**/*.jsx',
			'./gh-pages/components/route/**/*.jsx',
			'./gh-pages/routes/index.jsx'
		])
		.pipe(concat('comp.js', { newLine: ';\n\n' }))
		.pipe(babel())
		.pipe(gulp.dest('./gh-pages/public/'));
});

gulp.task('pg-js-vendor', () => {
	return gulp.src([ './bower_components/react/react.js', './bower_components/react-router/build/umd/ReactRouter.js' ])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./gh-pages/public/'));
});

gulp.task('pg-css', () => {
	return gulp.src('./gh-pages/assets/css/style.scss')
		.pipe(sass('style.css'))
		.pipe(gulp.dest('./gh-pages/public/'));
});

gulp.task('pg', [ 'pg-css', 'pg-js-comp', 'pg-js-vendor' ]);

gulp.task('pg-dev', () => {
	return gulp.watch('./gh-pages/**/*', [ 'pg' ]);
});