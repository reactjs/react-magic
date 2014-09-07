/**
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var githubPages = require('gulp-gh-pages');
var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var rename = require('gulp-rename');
var webpack = require('webpack');
var uglify = require('gulp-uglify');

var SITE_OUTPUT_DIR = 'build/site/';

gulp.task('default', ['build']);
gulp.task('build', ['build-htmltojsx', 'build-magic', 'build-site-misc']);

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
    .pipe(gulp.dest(SITE_OUTPUT_DIR));
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
    .pipe(gulp.dest(SITE_OUTPUT_DIR));
});

gulp.task('build-site-misc', function() {
  return gulp.src('site/*')
    .pipe(gulp.dest(SITE_OUTPUT_DIR));
});

gulp.task('deploy', ['build'], function() {
  return gulp.src('build/site/**/*')
    .pipe(githubPages({}));
});
