'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var apidoc = require('gulp-api-doc');
var nodemon = require('gulp-nodemon');

var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});

gulp.task('dev', ['apidoc', 'belint', 'beserver', 'serve']);

gulp.task('beserver', function () {
  nodemon({
    script: 'backend/index.js',
    watch: ['backend'],
    tasks: ['apidoc', 'belint']
  });
});

gulp.task('apidoc', function () {
  return gulp.src('backend/routing')
    .pipe(apidoc())
    .pipe(gulp.dest('documentation'));
});

gulp.task('belint', function () {
  return gulp.src(path.join(conf.paths.be, '/**/*.js'))
    .pipe($.eslint({
      envs: [
        'node',
        'es6',
        'mocha'
      ],
      rules: {
        'no-alert': 0,
        'no-bitwise': 0,
        'camelcase': 1,
        'curly': 1,
        'eqeqeq': 0,
        'no-eq-null': 0,
        'guard-for-in': 1,
        'no-empty': 1,
        'no-use-before-define': 0,
        'no-obj-calls': 2,
        'no-unused-vars': 0,
        'new-cap': 1,
        'no-shadow': 0,
        'strict': 2,
        'no-invalid-regexp': 2,
        'comma-dangle': 2,
        'no-undef': 1,
        'no-new': 1,
        'no-extra-semi': 1,
        'no-debugger': 2,
        'no-caller': 1,
        'semi': 1,
        'quotes': 0,
        'no-unreachable': 2
      },
      extends: "eslint:recommended",
      useEslintrc: false
    }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});