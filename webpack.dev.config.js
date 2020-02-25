const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  watch: true,
  entry: ['./src/index', './src/demo/demo'],
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: '/node_modules/'
      },
 
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
  
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/demo/demo.pug',
      filename: 'index.html',
    }),
  ],


};
