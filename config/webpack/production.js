var appRoot = require('app-root-path') + '';
var config = require('./shared');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var RailsManifestPlugin = require('rails-manifest-plugin');
var webpack = require('webpack');

config.module.loaders = config.module.loaders.concat([{
  test:    /\.scss$/,
  loader:  ExtractTextPlugin.extract(['css?sourceMap', 'resolve-url', 'sass?sourceMap'])
}, {
  test:   /active_admin\.css$/,
  loader: 'file?name=stylesheets/[name]-[hash].css'
}, {
  test:   /active_admin\.js$/,
  loader: 'file?name=javascripts/[name]-[hash].js'
}, {
  test:    /\.(gif|png|jpe?g|svg)$/i,
  loaders: ['file?name=images/[name]-[hash].[ext]', 'image-webpack']
}]);

config.output = {
  chunkFilename: 'javascripts/chunk.[id]-[hash].js',
  filename:      'javascripts/[name]-[hash].js',
  path:          path.join(appRoot, 'public', 'assets'),
  publicPath:    '/assets/'
};

config.plugins = [
  // Extract CSS to its own file(s)
  new ExtractTextPlugin('stylesheets/[name]-[hash].css'),

  // Create the manifest.json file so Rails can find the assets
  new RailsManifestPlugin(),

  // Remove duplicate code that can occur because of dependency trees
  new webpack.optimize.DedupePlugin(),

  // Only split up code into a chunk if it's at least 10 KB to avoid creating larger HTTP overhead
  new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),

  // Minify the JS with UglifyJS
  new webpack.optimize.UglifyJsPlugin(),

  // Expose the main Bower files to Webpack
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
  ])
];

module.exports = config;
