var appRoot = require('app-root-path') + '';
var config = require('./shared');
var path = require('path');
var webpack = require('webpack');

config.devServer = {
  proxy:  {
    '*': 'http://localhost:3001'
  }
};

config.devtool = 'cheap-module-eval-source-map';

config.module.loaders = config.module.loaders.concat([{
  test:    /\.scss$/,
  loaders: ['style?sourceMap', 'css?sourceMap', 'resolve-url', 'sass?sourceMap']
}, {
  test:    /\.(gif|png|jpe?g|svg)$/i,
  loaders: ['file?name=assets/[name].[ext]', 'image-webpack']
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
  // Expose the main Bower files to Webpack
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
  ])
];

module.exports = config;
