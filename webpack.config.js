const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const plugins = [new HtmlWebPackPlugin({
  template: 'index.html',
  filename: './index.html'

})];

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devServer: {
    port: 3000,
    hot: true,
    stats: {
      colors: true
    },
    overlay: {
      errors: true
    },
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      Containers: path.resolve(__dirname, 'src/Containers'),
      Components: path.resolve(__dirname, 'src/Components')
    }
  },
  entry: {
    main: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: [{
          loader: 'style-loader',

          options: {
            sourceMap: process.env.NODE_ENV === 'development'
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: process.env.NODE_ENV === 'development',
            autoprefixer: {
              add: true,
              browsers: ['last 3 versions']
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: process.env.NODE_ENV === 'development'
          }
        }]
      }
    ]
  },
  plugins
};
