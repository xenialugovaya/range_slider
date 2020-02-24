const path = require('path');
const webpack = require('webpack');

module.exports = {
  watch: true,
  entry: './src/index',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.ts$/,
        exclude: [ path.resolve(__dirname, "tests") ],
        enforce: 'post',
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        }
      }
 
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
 
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    hot: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery':'jquery',
      'window.$': 'jquery'
    }),
  ]

};
