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
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')
const newer = require('gulp-newer')
const sync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const ts = require('gulp-typescript')

const paths = {
	html: {
		src: './src/*.html',
		dest: './dist'
	},
	styles: {
		src: ['./src/styles/**/*.less', './src/styles/**/*.sass', './src/styles/**/*.scss'],
		dest: './dist/css'
	},
	scripts: {
		src: ['./src/scripts/**/*.js', './src/scripts/**/*.ts'],
		dest: './dist/js'
	},
	images: {
		src: './src/img/*',
		dest: './dist/img',
	}
}

function clean() {
	return del(['./dist/*', '!./dist/img'])
}

function styles() {
	return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		//.pipe(less())
		.pipe(autopref({
			cascade: false
		}))
		.pipe(cleanCSS({ level: 2}))
		.pipe(rename({
			basename: 'main',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(size({ showFiles: true}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(sync.stream())
}

function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(ts ({
			noImplicitAny: true,
			outFile: 'main.min.js'
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(size({ showFiles: true}))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(sync.stream())
}

function img() {
	return gulp.src(paths.images.src)
	.pipe(newer(paths.images.dest))
	.pipe(imagemin({ progressive: true }))
	.pipe(gulp.dest(paths.images.dest))
	.pipe(size({ showFiles: true}))
}

function minhtml() {
	return gulp.src(paths.html.src)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(size({ showFiles: true}))
		.pipe(gulp.dest(paths.html.dest))
		.pipe(sync.stream())
}

function watch() {
	sync.init({
		server: {
				baseDir: "./dist/"
		}
	})
	gulp.watch(paths.html.src, minhtml)
	gulp.watch(paths.html.dest, sync.reload)
	gulp.watch(paths.styles.src, styles)
	gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, minhtml, gulp.parallel(styles, scripts, img), watch)

exports.del = del
exports.img = img
exports.styles = styles
exports.watch = watch
exports.build = build
exports.minhtml = minhtml
exports.scripts = scripts
exports.default = build