const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const extractSass = new ExtractTextPlugin({
  filename: 'style.css',
  disable: process.env.NODE_ENV === 'development',
});
module.exports = {
  entry: [ './src' ], // this is where our app lives
  devtool: 'inline-source-map', // this enables debugging with source in chrome devtools
  output: {
    path: path.join(__dirname, 'public/build'), ////output files go to public/build
    publicPath: '/build/',
    filename: 'bundle.js', //package it all up in one bundle
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), //any static files should go in public
    historyApiFallback: true, // useful later
  },
  module: {
    rules: [
      {
        test: /(\.scss)$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
          fallback: 'style-loader', // use style-loader in development mode
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    extractSass,
],
};
