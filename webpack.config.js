const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Sea battle',
      template: './template.html',
    }),
  ],
  resolve: {
    // fallback: {
    //   process: require.resolve('process/browser'),
    // },
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    extensions: [
      '.ts',
      '.js',
    ]
  },
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    // historyApiFallback: true,
  },
};
