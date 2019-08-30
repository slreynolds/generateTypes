const path = require('path');
const outputPath = path.resolve(__dirname, '../dist');
const publicPath = process.env.PUBLIC_PATH || './';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/index.tsx')
  ],

  output: {
    path: outputPath,
    filename: '[name].bundle.js',
    publicPath: publicPath
  },

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    modules: [
      path.join(__dirname, '../src'),
      "node_modules"
    ],
    // Enable the typescript path aliases for webpack
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],

    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            },
          },
        ],

        exclude: /(node_modules)/,
      },
      {
        test: /\.(ttf|eot|svg|ico|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Typescript Type Generator',
      template: path.resolve('src/index.ejs')
    })
  ],
};
