const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const mode = process.env.NODE_ENV || 'development'

const sourceDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')

module.exports = {
  entry: ['regenerator-runtime', path.resolve(sourceDir, 'index.ts')],
  mode,

  output: {
    filename: 'bundle.js',
    path: distDir
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
    }),
    new CopyPlugin([
      {
        from: path.resolve(sourceDir, 'assets'),
        to: path.resolve(distDir, 'assets')
      }
    ])
  ]
}
