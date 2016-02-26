'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].[hash].bundle.js'
  }),
  new HtmlWebpackPlugin({
    template: './app/index.html',
    inject: 'body',
    minify: false
  })
];

const devPlugins = [];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    mangle: false,
    compress: {
      warnings: false
    }
  })
];

const plugins = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins);


module.exports = {

  entry: {
    app: './app/main.ts',
    vendor: [
      'es6-shim',
      'angular2/bundles/angular2-polyfills',
      'angular2/bootstrap',
      'angular2/platform/browser',
      'angular2/platform/common_dom',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },

  plugins: plugins,

  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint' }
    ],
    loaders: [
      { test: /\.ts$/,                      loader: 'ts',    exclude: /node_modules/ },
      { test: /\.html$/,                    loader: 'to-string!raw' },
      { test: /\.css$/,                     loader: 'to-string!css' },
      { test: /\.scss$/,                    loader: 'to-string!css!sass' },
      { test: /\.(svg|eot|woff|woff2|ttf)/, loader: 'url' },
      { test: /\.(jpeg|jpg|png|gif)/,       loader: 'url' }
    ],
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }

}
