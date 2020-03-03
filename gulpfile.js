const { src, dest, watch, series } = require('gulp')

const pug = require('gulp-pug')
const sass = require('gulp-sass')

const browserSync = require('browser-sync').create()


// Compile pug files into HTML
function html() {
  return src('app/*.pug')
    .pipe(pug())
    .pipe(dest('app/dist'))
    .pipe(browserSync.stream())
}

// Compile sass files into CSS
function styles() {
  return src('app/assets/styles/main.scss')
    .pipe(sass({
      includePaths: ['app/assets/styles'],
      errLogToConsole: true,
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(dest('app/dist/css'))
    .pipe(browserSync.stream())
}

// Copy assets
function scripts() {
  return src('app/assets/scripts/**/*.js')
    .pipe(dest('app/dist/scripts'))
    .pipe(browserSync.stream())
}

// Serve and watch sass/pug files for changes
function watchAndServe() {
  browserSync.init({
    server: 'app/dist',
  })

  watch('app/assets/styles/**/*.scss', styles)
  watch('app/*.pug', html)
  watch('app/assets/scripts/**/*.js', scripts)
}


exports.html = html
exports.styles = styles
exports.watch = watchAndServe
exports.default = series(html, styles, scripts, watchAndServe)