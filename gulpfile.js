const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const gulpWebpack = require('webpack-stream');
const karma = require('karma');
const path = require('path');
const pump = require('pump');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

gulp.task('clean', cb => pump([
  gulp.src('./dist', { allowEmpty: true }),
  $.clean(),
], cb));

gulp.task('lint', cb => pump([
  gulp.src([
    './src/**/*.js',
    './test/**/*.js',
    '*.js',
  ]),
  $.eslint(),
  $.eslint.format(),
  $.eslint.failAfterError(),
], cb));

gulp.task('js', cb => pump([
  gulpWebpack(webpackConfig, webpack),
  gulp.dest('./dist'),
], cb));

gulp.task('build', gulp.series(
  'clean',
  'lint',
  'js',
));

gulp.task('test:local', (done) => {
  new karma.Server({
    configFile: path.resolve(__dirname, './karma.conf.js'),
    singleRun: false,
  }, done).start();
});

gulp.task('test:ci', (done) => {
  new karma.Server({
    configFile: path.resolve(__dirname, './karma.conf.js'),
  }, done).start();
});
