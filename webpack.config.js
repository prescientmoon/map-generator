const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

const mode = process.env.NODE_ENV || 'development'

const sourceDir = path.resolve(__dirname, 'src')

module.exports = {
  entry: ['regenerator-runtime', path.resolve(sourceDir, 'index.ts')],
  mode,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      { test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: path.resolve(sourceDir, 'index.html')
    })
  ]
}
