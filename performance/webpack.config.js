const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const jsonImporter = require('json2scss-map-webpack-importer');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

const NAME = process.env.NAME || 'output';

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'output'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: jsonImporter(),
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${NAME}.css`,
    }),
    new CssoWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
