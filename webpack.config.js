const isProduction = process.env.NODE_ENV === 'production'
const webpack = require('webpack')
const path = require('path')
// DLLPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// const HappyPack = require('happypack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const publicUrl = '/'
module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    index: ['@babel/polyfill', (isProduction ? './src/index.tsx' : './src/example/index')]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, './dist/lib'),
    // publicPath: publicUrl,
    library: 'index',
    libraryTarget: 'umd2'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    compress: true,
    host: 'localhost',
    hot: true,
    open: true,
    progress: true,
    inline: true,
    clientLogLevel: 'none',
    historyApiFallback: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        // target: 'http://192.168.141.106:8888' // 叶腾
        target: 'http://114.116.18.175:8090' // 运维
        // target: 'http://192.168.14.133:8080'
      },
      '/servicecenter': {
        target: 'http://192.168.152.135:8080/servicecenter'
      }
    }
  },
  devtool: isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@config': path.resolve(__dirname, './src/config'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@stories': path.resolve(__dirname, './src/stories'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  module: {
    rules: [{
      test: /\.(jsx|tsx|js|ts)$/,
      use: ['awesome-typescript-loader'],
      exclude: /node_modules/
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      // exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    },
    {
      test: /\.(le|sa|sc|c)ss$/,
      use: [
        'css-hot-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            // modules: true,
            localIdentName: '[local]_[hash:base64:6]',
            minimize: isProduction
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: !isProduction,
            ident: 'postcss'
          }
        },
        {
          loader: 'resolve-url-loader'
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            sourceMap: !isProduction
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|jpeg|webp|gif|svg|ico|cur)(\?[=a-z0-9]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[hash:6].[ext]',
          // name: path.posix.join('dist/lib', 'images/[hash:6].[ext]'),
          fallback: 'file-loader'
        }
      }]
    },
    {
      test: /\.(ttf|eot|otf|woff(2)?)(\?[\s\S]+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash:6].[ext]'
        }
      }]
    }
    ]
  },
  // target: 'web',
  plugins: [
    // DllPlugin
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require((isProduction ? './build' : './public') + '/dist/js/vendor-manifest.json')
    // }),
    // new HappyPack({
    //   id: 'babel',
    //   threads: 4,
    //   loaders: ['babel-loader']
    // }),
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css'
    })
  ].concat(!isProduction ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new CleanWebpackPlugin('./dist'),
    new WebpackParallelUglifyPlugin({
      uglifyES: {
        mangle: false,
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info',
      excludeAssets: null,
      startAnalyzer: true
    })
  ])
}
