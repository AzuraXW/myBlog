const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
    common: path.resolve(__dirname, './src/common.js'),
    blog: path.resolve(__dirname, './src/blog.js'),
  },
  output: {
    path: path.resolve(__dirname, './js'),
    filename: './[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|svg|gif|webp)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3 * 1024,
              name: './img/[hash:8].[name].[ext]',
              esModule: false,
              publicPath: '../'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: './css/[name].css'
    }),
    new CleanWebpackPlugin()
  ]
}
