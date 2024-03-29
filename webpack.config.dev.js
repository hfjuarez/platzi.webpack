const DotEnv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  devServer: {
    compress: true,
    historyApiFallback: true,
    open: true,
    port: 3000,
    static: path.join(__dirname, "dist"),
  },
  devtool: "source-map",
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /.s?css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    assetModuleFilename: "public/images/[hash][ext][query]",
    clean: true,
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new DotEnv(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      inject: true,
      template: "./public/index.html",
    }),
    new MiniCSSExtractPlugin({
      filename: "public/[name].[contenthash].css",
    }),
  ],
  resolve: {
    alias: {
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/images": path.resolve(__dirname, "src/assets/images"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/templates": path.resolve(__dirname, "src/templates"),
      "@/utils": path.resolve(__dirname, "src/utils"),
    },
    extensions: [".js"],
  },
};
