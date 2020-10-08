const esbuild = require('esbuild');
const pkg = require('./package.json');

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

module.exports = {
  getCacheKey() {
    return Math.random().toString();
  },

  process(_content, filename) {
    const { outputFiles } = esbuild.buildSync({
      target: 'node12',
      platform: 'node',
      write: false,
      bundle: true,
      outfile: 'out-jest.js',
      sourcemap: 'inline',
      loader: {
        '.css': 'text',
      },
      entryPoints: [filename],
      external,
      define: {
        'process.env.NODE_ENV': '"development"',
      },
    });

    return Buffer.from(outputFiles[0].contents).toString();
  },
};
