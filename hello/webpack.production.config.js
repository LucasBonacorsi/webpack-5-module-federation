const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/hello-world.js',
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9001",
  },
  mode: "production",
  optimization: {
    splitChunks:{
      chunks: 'all',
      minSize: 3000
    }
  },
  module: {
    rules: [
      {
        test: /\.(ttf)$/,
        type: "asset/resource",
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'hello-world.html',
      title: "Webpack testing",
      template: "src/page-template.hbs",
      description: "Some description"
    }),
    new ModuleFederationPlugin({
      name: 'HelloWorldApp',
      filename: 'remoteEntry.js',
      exposes:{
        './HelloWorldButton': './src/components/button/hello-world-button'
      }
    })
  
  ],
};
