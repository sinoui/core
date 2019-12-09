/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  title: '@sinoui/core',
  tagline: '遵循Material Design的标准UI组件库。',
  url: 'https://sinoui.github.io/core',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'sinosoft', // Usually your GitHub org/user name.
  projectName: 'sinoui-core', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'sinoui',
      logo: {
        alt: 'sinoui',
        src: 'img/logo.svg',
      },
      links: [
        { to: 'docs/components/button', label: '文档', position: 'left' },
        {
          href: 'https://github.com/sinoui/core',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: 'docs/components/button',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [require.resolve('./plugins/ts-loader')],
  themes: ['@docusaurus/theme-live-codeblock'],
};
