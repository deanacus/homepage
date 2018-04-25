/* Plugins
 * -------------------- */
var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var cssmin = require( 'gulp-cssmin' );
var del = require( 'del' );
var sourcemaps = require( 'gulp-sourcemaps' );
var rollup = require( 'gulp-rollup' );
var browserSync = require( 'browser-sync' ).create();
var exec = require( 'child_process' ).exec;
var domain = require( './domain.secret' );

/* Sources and Destinations
 * -------------------- */
input = {
	'html': 'src/**/*.html',
	'css': 'src/assets/scss/**/*.scss',
	'js': 'src/assets/js/**/*.js',
	'img': 'src/assets/img/**/*',
	'fonts': 'src/assets/fonts/**/*',
},

output = {
	'html': 'build/',
	'css': 'build/assets/css/',
	'js': 'build/assets/js/',
	'img': 'build/assets/img/',
	'fonts': 'build/assets/fonts/',
	'domain': domain,
};


/* Set up BrowserSync
 * -------------------- */
gulp.task( 'browserSync', function() {
	browserSync.init( {
		server: {
			baseDir: 'build',
		},
	} );
} );

/* Compile SASS
 * -------------------- */
gulp.task( 'sass', function() {
	gulp
		.src( input.css )
		.pipe( sourcemaps.init() )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( cssmin() )
		.pipe( sourcemaps.write() )

		.pipe( gulp.dest( output.css ) )
		.pipe( browserSync.reload( {
			stream: true,
		} ) );
} );

/* Compile JS
 * -------------------- */
gulp.task( 'js', function() {
	gulp
		.src( input.js )
		// .pipe(jsmin())
		.pipe( rollup( {
			input: './src/assets/js/app.js', format: 'es',
		} ) )
		.pipe( gulp.dest( output.js ) )
		.pipe( browserSync.reload( {
			stream: true,
		} ) );
} );

/* Process Images
 * -------------------- */
gulp.task( 'img', function() {
	gulp
		.src( input.img )
		.pipe( gulp.dest( output.img ) )
		.pipe( browserSync.reload( {
			stream: true,
		} ) );
} );

/* Process Fonts
 * -------------------- */
gulp.task( 'fonts', function() {
	gulp
		.src( input.fonts )
		.pipe( gulp.dest( output.fonts ) )
		.pipe( browserSync.reload( {
			stream: true,
		} ) );
} );

/* Process HTML
 * -------------------- */
gulp.task( 'html', function() {
	gulp
		.src( input.html )
		.pipe( gulp.dest( output.html ) )
		.pipe( browserSync.reload( {
			stream: true,
		} ) );
} );

/* Watch
 * -------------------- */
gulp.task( 'watch', [
	'browserSync',
], function() {
	gulp.watch( input.html, [
		'html',
	] );
	gulp.watch( input.css, [
		'sass',
	] );
	gulp.watch( input.js, [
		'js',
	] );
} );

/* Clean up everything
 * -------------------- */
gulp.task( 'clean', function() {
	del.sync( [
		'build/**',
	] );
} );

/* Put it on the line
 * -------------------- */
gulp.task( 'deploy', [
	'build',
], () => {
	if ( 0 !== domain.length ) {
		var deployCommand = 'surge ' + output.html + ' ' + domain;
		exec( deployCommand );
	}
	else {
		console.log( 'No domain file exists' );
	}
} );

/* Default task
 * -------------------- */
gulp.task( 'build', [
	'sass',
	'js',
	'img',
	'fonts',
	'html',
] );

/* Default task
 * -------------------- */
gulp.task( 'default', [
	'build',
	'watch',
] );
