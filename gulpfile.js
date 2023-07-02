const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const del = require('del')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autopref = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')

const paths = {
	styles: {
		src: './src/styles/**/*.less',
		dest: './dist/css'
	},
	scripts: {
		src: './src/scripts/**/*.js',
		dest: './dist/js/'
	},
	images: {
		src: './src/img/*',
		dest: './dist/img',
	}
}

function clean() {
	return del(['dist'])
}

function styles() {
	return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autopref({
			cascade: false
		}))
		.pipe(cleanCSS({ level: 2}))
		.pipe(rename({
			basename: 'main',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest))
}

function img() {
	return gulp.src(paths.images.src)
	.pipe(imagemin({progressive: true}))
	.pipe(gulp.dest(paths.images.dest))
}

function watch() {
	gulp.watch(paths.styles.src, styles)
	gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, img), watch)

exports.del = del
exports.img = img
exports.styles = styles
exports.watch = watch
exports.build = build
exports.scripts = scripts