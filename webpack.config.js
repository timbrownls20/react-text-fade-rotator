const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  //template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  mode: "production",
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  plugins: [htmlPlugin],
};


// module.exports = {
//   mode: "development",
//   entry: "./index.tsx",
//   output: {
//     filename: "index.js",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         exclude: /node_modules/,
//         use: ["babel-loader", "ts-loader"],
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.tsx$/,
//         use: ["source-map-loader"],
//         enforce: "pre",
//       },
//       {
//         test: /\.(png|jpe?g|gif)$/i,
//         use: ["file-loader"],
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".tsx", ".ts", ".js", "css"],
//   }
// };
