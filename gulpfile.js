/**
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var del = require('del');
var githubPages = require('gulp-gh-pages');
var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var livereload = require('gulp-livereload');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var spawn = require('child_process').spawn;
var webpack = require('webpack');
var uglify = require('gulp-uglify');

var SITE_OUTPUT_DIR = 'build/site/';
var PACKAGE_OUTPUT_DIR = 'build/package/';

gulp.task('default', ['build']);
gulp.task('build', [
  'build-htmltojsx', 'build-magic', 'build-site-misc', 'build-package'
]);

gulp.task('build-htmltojsx', function() {
  return gulp.src('src/htmltojsx.js')
    .pipe(gulpWebpack({
      output: {
        library: 'HTMLtoJSX',
        libraryTarget: 'umd',
        filename: 'htmltojsx.js',
      },
      plugins: [
        new webpack.DefinePlugin({
          IN_BROWSER: true,
        }),
      ],
    }))
    .pipe(gulp.dest(SITE_OUTPUT_DIR))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(SITE_OUTPUT_DIR))
    .pipe(livereload({ auto: false }));
});

gulp.task('build-magic', function() {
  return gulp.src('src/magic.js')
    .pipe(gulpWebpack({
      output: {
        library: 'ReactMagic',
        libraryTarget: 'umd',
        filename: 'magic.js',
      },
      plugins: [
        new webpack.DefinePlugin({
          IN_BROWSER: true,
        }),
      ],
    }))
    .pipe(gulp.dest(SITE_OUTPUT_DIR))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(SITE_OUTPUT_DIR))
    .pipe(livereload({ auto: false }));
});

gulp.task('build-site-misc', function() {
  return gulp.src(['site/*', 'test/*'])
    .pipe(gulp.dest(SITE_OUTPUT_DIR))
    .pipe(livereload({ auto: false }));
});

gulp.task('build-package', function() {
  var main = gulp
    .src([
      '**/*', '!README*.md', '!node_modules{,/**}', '!build{,/**}',
      '!site{,/**}', '!temp{,/**}',
    ])
    .pipe(gulp.dest(PACKAGE_OUTPUT_DIR));

  var readme = gulp.src('README-htmltojsx.md')
    .pipe(rename('README.md'))
    .pipe(gulp.dest(PACKAGE_OUTPUT_DIR));

  return merge(main, readme);
});

gulp.task('publish-site', ['build'], function() {
  return gulp.src('build/site/**/*')
    .pipe(githubPages({}));
});

gulp.task('publish-package', ['build'], function(callback) {
  spawn(
    'npm',
    ['publish', PACKAGE_OUTPUT_DIR],
    { stdio: 'inherit' }
  ).on('close', callback);
});

gulp.task('clean', function(callback) {
  del(['build'], callback);
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['site/*', 'test/*'], ['build-site-misc']);
  gulp.watch('src/htmltojsx.js', ['build-htmltojsx']);
});
