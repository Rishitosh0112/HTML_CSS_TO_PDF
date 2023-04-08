const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

console.log("dirname", path.resolve(__dirname));
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack",
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/source-pdf-folder/one.css",
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: "./src/source-pdf-folder/one.html",
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
};
