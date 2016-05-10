/* jshint node: true, camelcase: false */
var appRoot = require('app-root-path') + '';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var sassSources = [];

// Collect the bower.json files from each of the installed components
var bowerPath = path.join(appRoot, 'bower_components');
var bowerComponents = fs.readdirSync(bowerPath).filter(function(entry) {
  return fs.statSync(path.join(bowerPath, entry)).isDirectory();
});
var bowerFiles = bowerComponents.map(function(component) {
  return path.join(bowerPath, component, 'bower.json');
});

// Read each of the bower.json files to find the main file
// and add the directory to the list of CSS and JS sources
bowerFiles.forEach(function(bowerFile) {
  var bowerConfig = require(bowerFile);
  if (bowerConfig.main === undefined) {
    return;
  }

  // Find the main file(s) specified by bower.json
  var mainFiles = bowerConfig.main;
  if (typeof(mainFiles) === 'string') {
    mainFiles = [mainFiles];
  }

  // Add the directory of each main file as a CSS and JS source
  mainFiles.forEach(function(file) {
    var componentPath = path.dirname(bowerFile);
    var filePath = path.dirname(file);
    var source = path.join(componentPath, filePath).replace(appRoot + '/', '');
    sassSources.push(source);
  });
});

module.exports = {
  // the base path which will be used to resolve entry points
  context: appRoot,

  entry: {
    active_admin: ['./app/assets/active_admin/main.js', 'turbolinks'],
    application:  ['./app/assets/application/main.js', 'turbolinks']
  },

  module: {
    loaders: [{
      test:    /\.jsx?$/,
      exclude: /(bower_components|node_modules)/,
      loaders: ['babel?presets=es2015', 'import-glob']
    }, {
      test:    /\.scss$/,
      include: /(views)/,
      loaders: ['style', 'css', 'sass', 'import-glob']
    }, {
      test:    /\.scss$/,
      exclude: /(bower_components|node_modules|views)/,
      loader:  ExtractTextPlugin.extract(['css?sourceMap', 'sass?sourceMap', 'import-glob'])
    }, {
      test:   require.resolve('turbolinks'),
      loader: 'imports?this=>window'
    }]
  },

  output: {
    chunkFilename: 'chunk.[id].js',
    filename:      '[name].js',
    path:          path.join(appRoot, 'app', 'assets', '_build'),
    publicPath:    '/assets/',

    // Add the virtual source files under the domain > assets directory
    // in the browser developer tools Sources tab.
    devtoolModuleFilenameTemplate:         '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },

  plugins: [
    // Expose the main Bower files to Webpack
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ]),

    new ExtractTextPlugin('[name].css')
  ],

  resolve: {
    // Tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js'],

    // Add Bower and Node modules to the directories searched by Webpack
    modulesDirectories: [
      'app/assets/utilities',
      'bower_components',
      'node_modules'
    ],
  },

  sassLoader: {
    data:         '@import "codelation";\n',
    includePaths: sassSources
  }
};
