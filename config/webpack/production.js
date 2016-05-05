/* jshint node: true */
var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
  // the base path which will be used to resolve entry points
  context: __dirname,

  entry: {
    admin:       './app/frontend/javascripts/admin.js',
    application: './app/frontend/javascripts/application.js'
  },

  output: {
    chunkFilename: 'chunk.[id].js',
    filename:      '[name].js',
    path:          path.join(__dirname, 'app', 'assets', 'javascripts'),
    publicPath:    '/assets',

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

    // Expose Turbolinks to the entire application
    new webpack.ProvidePlugin({
      Turbolinks: 'turbolinks'
    })
  ],

  resolve: {
    // Tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js'],

    // Add Bower and Node modules to the directories searched by Webpack
    modulesDirectories: [
      'bower_components',
      'node_modules'
    ],
  }
};
