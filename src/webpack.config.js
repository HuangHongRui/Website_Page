
const path = require('path'),
  webpack = require("webpack"),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  WebpackNotifierPlugin = require('webpack-notifier');

let base = {
  index:'./js/app/index.js',
  // common:"./common.js"
};

module.exports = {
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool:'source-map',
  // https://webpack.js.org/configuration/target/#target
  target:"web",
  entry:base,
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].js'
  },
  resolve:{
    alias:{
      // test:path.resolve(__dirname,'test/test.js')
      jquery: path.resolve(__dirname, "js/lib/jquery-2.0.3.min.js"),
      mod: path.resolve(__dirname, "js/mod"),
      lib: path.resolve(__dirname, "js/lib"),
      img: path.resolve(__dirname, "img"),
      css: path.resolve(__dirname, "css")
    }
  },
  // webpack lifecycle :before-complitaion run done =>
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new WebpackNotifierPlugin({
      title: 'Webpack 编译成功',
      contentImage: path.resolve(process.cwd(), './img/avatar.jpeg'),
      alwaysNotify: true
    }),
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: true
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: Infinity
    // })
  ],
  module:{
    rules:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader:'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use:{
            loader:'css-loader',
            options: {
              sourceMap: true,
              minimize: true
            }
          }
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader',{
            loader:'less-loader',
            options: {
              sourceMap: true
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader',{
            loader:'sass-loader',
            options: {
              sourceMap: true
            }
          }]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf|ico)$/,
        use: {
          loader:'file-loader',
          options:{
            name:'[name]_[sha512:hash:base64:7].[ext]'
          }
        }
      },
      {
        test: /\.html/,
        use:{
          loader:"html-loader",
          options:{
            minimize: false,
            attrs:false
          }
        }
      }
    ]
  }
};
