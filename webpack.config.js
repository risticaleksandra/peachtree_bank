const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: path.resolve(__dirname, 'src/index'),
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader', ]
      },{
        test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
      },
      {
        test: /\.scss$/,
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader" 
          }, {
            loader: "sass-loader"
          },
        ]},
        {
          test: /\.(jpg|png)$/,
          include: path.resolve(__dirname, 'src/public/assets'),
          use: {
            loader: 'url-loader',
            loader: 'file-loader' 
          },
        },
      
     ]
        },
    devServer: {
      contentBase:  path.resolve(__dirname),
      port: 9000
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html" 
      })
    ]
  };