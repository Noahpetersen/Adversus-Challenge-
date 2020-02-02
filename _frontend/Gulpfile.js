// Prepare gulp & plugins
const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const WebpackDevServer = require('webpack-dev-server')

const paths = {
  root: path.join(__dirname, '../'),
  sass: './src/sass',
  js:   './src/js',
  dist: '../dist'
};

var $ = {};
const plugins = {
  'livereload': 'gulp-livereload',
  'plumber':    'gulp-plumber',
  'sass':       'gulp-sass',
  'sourcemaps': 'gulp-sourcemaps'
};

for (let key in plugins) {
  $[key] = require(plugins[key]);
};

// Error handling
const onError = (error) => {
	console.log(error);
};

gulp.task('css', () => {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sass({
      includePaths: paths.sass,
    }).on('error', $.sass.logError))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist + '/css/'))
    .pipe($.livereload());
});

gulp.task('watch', () => {
	$.livereload.listen();
  gulp.watch(['**/*.scss'], {cwd: paths.sass}, ['css']);
  gulp.watch([
    paths.root + '/**/*.html',
  ]).on('change', (f) => {
    $.livereload.changed(f);
  });
});

gulp.task('webpack-dev-server', () => {
  const bundlerConfig = config({}, {
    mode: 'development', hotReload: true
  });
  const bundler = webpack(bundlerConfig);
  const server = new WebpackDevServer(bundler, bundlerConfig.devServer);

  server.listen(8080, 'localhost', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('All ok')
    }
  });
})

gulp.task('default', ['css', 'webpack-dev-server', 'watch']);