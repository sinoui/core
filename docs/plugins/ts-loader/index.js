/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');

module.exports = function(_context, _options) {
  console.log(resolve(__dirname, 'node_modules/react/index.js'));
  return {
    name: 'ts-loader',
    configureWebpack(config, _isServer) {
      return {
        resolve: {
          alias: {
            '@sinoui/core': resolve(__dirname, '../../../src'),
            react: resolve(__dirname, '../../node_modules/react/index.js'),
            'react-dom': resolve(
              __dirname,
              '../../node_modules/react-dom/index.js',
            ),
          },
          extensions: [
            ...(config.resolve.extensions || []),
            '.tsx',
            '.ts',
            '.js',
            '.jsx',
            '.md',
            '.mdx',
            '.json',
          ],
        },
        module: {
          rules: [
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              exclude: /\.(mdx?)$/i,
              use: ['file-loader', { loader: 'image-webpack-loader' }],
            },
            {
              test: /\.(ts|tsx)$/i,
              exclude: /\.(mdx?)$/i,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    presets: ['babel-preset-ts-lib'],
                    cacheDirectory: true,
                  },
                },
              ],
            },
          ],
        },
      };
    },
  };
};
