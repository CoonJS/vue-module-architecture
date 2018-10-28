const fs = require('fs');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname , 'dist'),
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js'
  },
  devtool: 'source-map',
  cache: true,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|woff|woff2|ttf)/,
        loader: 'file-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    new HtmlWebpackPlugin({
      title: 'Platform',
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body',
      favicon: path.resolve(__dirname, 'favicon.ico')
    }),
  ],

  devServer: {
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      '*': {
        target: 'https://dev.salestat.org',
        secure: false
      }
    },
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'domain.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'domain.crt'))
    }
  }
};