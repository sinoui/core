const { resolve } = require('path');

module.exports = ({ config }) => {
  config.plugins = config.plugins.filter((plugin) => {
    const name = plugin.name;
    const isDocgen = name === 'React Docgen Typescript Plugin';
    return !isDocgen;
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['babel-preset-ts-lib'],
          cacheDirectory: true,
        },
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    '@sinoui/core': resolve(__dirname, '../src'),
  };

  return config;
};
