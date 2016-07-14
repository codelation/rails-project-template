var appRoot = require('app-root-path') + '';
var config = require('./shared');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

config.devServer = {
  proxy:  {
    '*': 'http://localhost:3001'
  }
};

config.devtool = 'cheap-module-eval-source-map';

config.module.loaders = config.module.loaders.concat([{
  test:    /(active_admin|mailer)\.scss$/,
  loader:  ExtractTextPlugin.extract(['css?sourceMap', 'resolve-url', 'sass?sourceMap']),
}, {
  test:    /\.scss$/,
  exclude: /(active_admin|mailer)\.scss$/,
  loaders: ['style?sourceMap', 'css?sourceMap', 'resolve-url', 'sass?sourceMap']
}, {
  test:    /\.(gif|png|jpe?g|svg)$/i,
  loaders: ['file?name=images/[name].[ext]', 'image-webpack']
}]);

config.output = {
  chunkFilename: 'javascripts/chunk.[id].js',
  filename:      'javascripts/[name].js',
  path:          path.join(appRoot, 'public', 'assets'),
  pathinfo:      true,
  publicPath:    'http://localhost:3000/',

  // Add the virtual source files under the domain > assets directory
  // in the browser developer tools Sources tab.
  devtoolModuleFilenameTemplate:         '[resourcePath]',
  devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
};

config.plugins = [
  // Extract the active_admin.css and mailer.css files
  new ExtractTextPlugin('stylesheets/[name].css'),

  // Expose the main Bower files to Webpack
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
  ])
];

module.exports = config;
