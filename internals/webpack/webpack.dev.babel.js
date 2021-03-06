import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const htmlMinifyOpts = {
  collapseWhitespace: true,
  decodeEntities: true,
  removeComments: true,
  removeEmptyAttributes: true,
  sortAttributes: true,
  sortClassName: true
}

const rootDir = path.resolve(__dirname, '../..')

export default {
  mode: 'production',
  entry: {
    app: [
      path.join(rootDir, 'src/app/index.js'),
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  output: {
    path: path.join(rootDir, 'build/assets'),
    publicPath: '/assets/',
    filename: 'js/[name].[hash:5].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: path.join(rootDir, 'src/resources/html/index.html'),
      filename: path.join(rootDir, 'build/index.html'),
      minify: htmlMinifyOpts
    }),
    new ExtractTextPlugin('css/[name].[hash:5].css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [ 'env', {
                  target: {
                    browser: [ 'last 2 versions', 'safari >= 7' ]
                  }
                } ],
                'react',
                'stage-2'
              ],
              plugins: [
                'transform-decorators-legacy',
                'transform-runtime'
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|bmp|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:5].[ext]',
              publicPath: '/assets/',
              emitFile: true
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:5].[ext]',
              publicPath: '/assets/',
              emitFile: true
            }
          }
        ]
      },
      {
        test: /.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'stylus-loader',
              options: {
                import: [
                  '~kouto-swiss/index.styl'
                ]
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [
      'src/app',
      'node_modules',
      'src/resources'
    ],
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.styl'
    ]
  }
}
