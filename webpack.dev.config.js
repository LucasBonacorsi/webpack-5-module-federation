const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  devtool: 'source-map',
  mode: "development",

  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist")
    },
    devMiddleware: {
      index: 'index.html',
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
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
      filename: "styles.[contenthash].css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
      ],
    }),
    new HtmlWebpackPlugin({
      title: "Webpack testing",
      template: "src/index.hbs",
      description: "Some description",
    }),
  ],
};
