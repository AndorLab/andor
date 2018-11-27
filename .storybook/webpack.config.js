const path = require('path')

// const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')
module.exports = (baseConfig, env, config) => {
  config.resolve.extensions.push('.ts', '.tsx', '.js', '.json', '.md')
  config.resolve.alias = {
    '@config': path.resolve(__dirname, '../src/config'),
    '@components': path.resolve(__dirname, '../src/components'),
    '@pages': path.resolve(__dirname, '../src/pages'),
    '@utils': path.resolve(__dirname, '../src/utils'),
    '@stories': path.resolve(__dirname, '../src/stories'),
    '@layouts': path.resolve(__dirname, '../src/layouts'),
    '@api': path.resolve(__dirname, '../src/api'),
    '@assets': path.resolve(__dirname, '../src/assets'),
    '@theme': path.resolve(__dirname, '../src/theme')
  }
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
    // options: {
    //   configFileName: path.resolve(__dirname, './tsconfig.json')
    // }
    // use: [
    //   require.resolve('awesome-typescript-loader'),
    //   require.resolve('react-docgen-typescript-loader'),
    //   options: { configFileName: path.resolve(__dirname, './tsconfig.json') }
    // ]
  }, {
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
          minimize: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: !true,
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
          sourceMap: !true
        }
      }
    ]
  })
  config.resolve.extensions.push('.ts', '.tsx')
  // Extend it as you need.
  config.plugins.push(new TSDocgenPlugin())
  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'static/style/[name].css'
  }))
  return config
}