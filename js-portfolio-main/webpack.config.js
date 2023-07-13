const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
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
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name][contenthash].[ext]",
            outputPath: "./public/fonts/",
            publicPath: "./public/fonts/",
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  output: {
    assetModuleFilename: "public/images/[hash][ext][query]",
    clean: true,
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./index.html",
      inject: true,
      template: "./public/index.html",
    }),
    new MiniCSSExtractPlugin({
      filename: "public/[name].[contenthash].css",
    }),
    new CssMinimizerPlugin(),
  ],
  resolve: {
    extensions: [".js"],
  },
};
