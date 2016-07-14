/* jshint node: true */
var appRoot = require('app-root-path') + '';
var iconLoader = require('vue-icons/icon-loader');
var environment = require('./environment');
var path = require('path');
var sassSources = require('webpack-bower-sass-sources');

module.exports = {
  babel: {
    presets: ['es2015']
  },

  callbackLoader: {
    getIcons: iconLoader(['fa-smile-o']).getIcons
  },

  context: appRoot,

  entry: {
    active_admin: path.join(appRoot, 'app/assets/active_admin.scss'),

    application: [
      'sizzle',
      'turbolinks',
      'vue',
      'vuex',
      path.join(appRoot, 'app/assets/application.js'),
      path.join(appRoot, 'app/assets/application.scss')
    ],

    mailer: path.join(appRoot, 'app/assets/mailer.scss')
  },

  module: {
    preLoaders: [{
      test:    /\.jsx?$/,
      loaders: ['import-glob']
    }, {
      test:    /\.scss$/,
      loaders: ['wrap?sass', 'sass-wrap', 'import-glob']
    }],

    loaders: [{
      test:    /\.jsx?$/,
      exclude: /(bower_components|vue-icons)/,
      loaders: ['babel']
    }, {
      test:    /\.vue$/,
      loaders: ['babel', 'vue']
    }, {
      test:   require.resolve('sizzle'),
      loader: 'expose?Sizzle'
    }, {
      test:   require.resolve('turbolinks'),
      loader: 'imports?this=>window'
    }, {
      test:   require.resolve('vue'),
      loader: 'expose?Vue'
    }, {
      test:   require.resolve('vuex'),
      loader: 'expose?Vuex'
    }, {
      test:   /vue-icons/,
      loader: 'callback'
    }]
  },

  resolve: {
    // Tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js'],

    // Add Bower modules, Node modules, and utilities to the directories searched by Webpack
    modulesDirectories: [
      'app/assets/',
      'app/assets/components',
      'app/assets/images',
      'app/assets/utilities',
      'app/assets/vuex',
      'bower_components',
      'node_modules'
    ],
  },

  sassLoader: {
    includePaths: sassSources
  },

  wrap: {
    sass: {
      before: [
        '@import "codelation";',
        '$env: "' + environment + '";'
      ]
    }
  }
};
