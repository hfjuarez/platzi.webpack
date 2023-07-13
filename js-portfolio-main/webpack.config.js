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
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
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
    alias: {
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/images": path.resolve(__dirname, "src/assets/images"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/utils": path.resolve(__dirname, "src/utils"),
    },
    extensions: [".js"],
  },
};
