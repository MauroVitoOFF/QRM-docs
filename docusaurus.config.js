// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'QRM Docs',
  tagline: 'Framework per server roleplay su NeoForge',
  url: 'https://maurovitooff.github.io',
  baseUrl: '/QRM-docs/',
  organizationName: 'MauroVitoOFF',
  projectName: 'QRM-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  i18n: { defaultLocale: 'it', locales: ['it'] },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/MauroVitoOFF/QRM-docs/edit/main/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      },
    ],
  ],
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      { hashed: true, language: ['it'], docsRouteBasePath: '/', indexBlog: false },
    ],
  ],
  themeConfig: {
    colorMode: { defaultMode: 'dark', respectPrefersColorScheme: true },
    navbar: {
      title: 'QRM',
      items: [
        { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Documentazione' },
        { href: 'https://github.com/MauroVitoOFF/QRM-docs', label: 'GitHub', position: 'right' },
      ],
    },
    footer: { style: 'dark', copyright: 'QRM — Apache-2.0' },
  },
};
module.exports = config;
