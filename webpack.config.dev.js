var path = require('path')
var webpack = require('webpack')
var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')


var dashboard = new Dashboard()


module.exports = {
  // The base directory for resolving the entry option
  context: __dirname,
  devtool: 'eval',

  entry: {
    app: ['index']
  },

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/assets/',
    filename: '{{PKG_NAME}}.dev.js',
    pathinfo: true
  },

  // Where to resolve our loaders
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
    moduleExtensions: ['-loader'],
  },

  resolve: {
    // Directories that contain our modules
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    descriptionFiles: ['package.json'],
    moduleExtensions: ['-loader'],
    // Extensions used to resolve modules
    extensions: ['.js', '.react.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel'],
        exclude: [/node_modules/]
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}}),
    new webpack.NamedModulesPlugin(),
    new DashboardPlugin(dashboard.setData),
  ],

  // Include mocks for when node.js specific modules may be required
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
