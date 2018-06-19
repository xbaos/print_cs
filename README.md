1.修改react-scripts包下的配置，完成cssModule
```javaScript
{
    test: /\.css$/,
    exclude:[/node_modules/],
    use: [
      require.resolve('style-loader'), {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: true, // 新增对css modules的支持
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      }, {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009'
            })
          ]
        }
      }
    ]
  },
  {
    test: /\.css$/,
    exclude:[/src/],
    use: [
      require.resolve('style-loader'), {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          // modules: true, // 新增对css modules的支持
          // localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      }, {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009'
            })
          ]
        }
      }
    ]
  },
```