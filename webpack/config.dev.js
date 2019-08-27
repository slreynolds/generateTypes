const merge = require('webpack-merge');
const config = require('./config');
const path = require('path');

const outputPath = path.resolve(__dirname, '../dist');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0', // in order to send links to your stuff inside the institute network
    port: process.env.PORT || 3000,
    contentBase: outputPath,
    watchOptions: {
      poll: 500
    }
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
    }),
  ],

});
