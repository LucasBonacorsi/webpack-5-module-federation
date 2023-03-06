const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry:'./src/cat.js',
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  devtool: 'source-map',
  mode: "development",

  devServer: {
    port: 9002,
    static: {
      directory: path.resolve(__dirname, "./dist")
    },
    devMiddleware: {
      index: 'cat.html',
      writeToDisk: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(ttf)$/,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use:[ 'handlebars-loader']
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'cat.html',
      title: "Cat",
      template: "src/page-template.hbs",
      description: "Cat page",
    }),
    new ModuleFederationPlugin({
      name: 'CatApp',
      remotes: {
        HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js'
      }
    })
  ],
};
