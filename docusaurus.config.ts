import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const isDeployPreview = process.env.GITHUB_PAGES === 'true';
const isPR = process.env.GITHUB_EVENT_NAME === 'pull_request';
const prNumber = process.env.GITHUB_EVENT_NAME === 'pull_request' ? process.env.GITHUB_EVENT_NUMBER : '';

// Set a fixed baseUrl for GitHub Pages
const baseUrl = '/';

const config: Config = {
  title: 'Fhenix',
  tagline: 'Unlock Onchain Confidentiality on Ethereum',
  favicon: 'img/Favicon_Dark.svg',

  // Set the production url of your site here
  url: 'https://fhenixprotocol.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fhenixprotocol', // Usually your GitHub org/user name.
  projectName: 'cofhe-docs', // Usually your repo name.
  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Add styled-components configuration
  stylesheets: [
    {
      rel: 'stylesheet',
      href: '/styles/global.css',
    },
  ],
  
  scripts: [
    {
      src: '/scripts/styled-components-fix.js',
      async: true,
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/fhenixprotocol/cofhe-docs/tree/master/',
          routeBasePath: 'docs',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-5X4J3CF7',
      },
    ],
  ],
  themeConfig: {
    metadata: [
      {name: 'keywords', content: 'Fhenix, Blockchain, FHE, Cofhe, Threshold Network, Fully Homomorphic Encryption, Layer 2, L2, Coprocessor, Blockchain Technology, Secure Computing, Scalable Blockchain, Decentralized'},
      {name: 'author', content: 'FHE Labs'},
      {name: 'twitter:card', content: 'summary_large_image'}
    ],
    // Replace with your project's social card
    image: 'img/Splash.webp',
    colorMode: {
    },
    navbar: {
      title: 'Fhenix Docs',
      logo: {
        alt: 'Fhenix',
        src: 'img/logo-black.svg',
        srcDark: 'img/logo-white.svg',
        className: 'navbar__logo',
      },
      items: [
        // {
        //   position: 'left',
        //   label: 'Home',
        //   to: '/',
        // },
        {
          position: 'left',
          label: 'Developer Docs',
          to: '/docs/devdocs/overview',
        },
        {
          position: 'left',
          label: 'Tutorials',
          to: '/docs/indexes/tutorials',
        },
        {
          href: 'https://github.com/fhenixprotocol/',
          className: 'header-github-link',
          position: 'right',
        },
        {
          href: 'https://discord.gg/FuVgxrvJMY',
          className: 'header-discord-link',
          position: 'right',
        },
        {
          href: 'https://twitter.com/FhenixIO',
          className: 'header-twitter-link',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Quick Links',
          items: [
            {
              label: 'Home',
              to: '/',
              className: 'footer-link-item',
            },
            {
              label: 'Developer Docs',
              to: '/docs/devdocs/overview',
              className: 'footer-link-item',
            },
            {
              label: 'Tutorials',
              to: '/docs/indexes/tutorials',
              className: 'footer-link-item',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Medium',
              href: 'https://medium.com/@Fhenix',
              className: 'footer-link-item',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/FuVgxrvJMY',
              className: 'footer-link-item',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/FhenixIO',
              className: 'footer-link-item',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Fhenix',
              href: 'https://fhenix.io',
              className: 'footer-link-item',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/fhenixprotocol',
              className: 'footer-link-item',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fhe Labs.`,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'EMZX0TM6JC',

      // Public API key: it is safe to commit it
      apiKey: '7053edb0c71f9da5171b05b1836adf78',

      indexName: 'fhenix',

      // Optional: see doc section below
      contextualSearch: false,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: '/docs/', // or as RegExp: /\/docs\//
      //   to: '/',
      // },

      // Optional: Algolia search parameters
      // searchParameters: {},


      // // Optional: path for search page that enabled by default (`false` to disable it)
      // searchPagePath: 'search',

      //... other Algolia params
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity'],
      tabSize: 4,
      magicComments: [
        {
          className: 'code-block-diff-add-line',
          line: 'diff-add'
        },
        {
          className: 'code-block-diff-remove-line',
          line: 'diff-remove'
        }
      ]
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
