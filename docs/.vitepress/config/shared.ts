import { defineConfig } from 'vitepress'

import { algolia } from './search/algolia'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'SMSerialport',

  base: '/smserialport/',
  sitemap: {
    hostname: 'https://imba97.github.io/smserialport/'
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'logo.svg' }],

    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'SMSerialport | Sending SMS via serial port' }],
    ['meta', { property: 'og:site_name', content: 'SMSerialport' }],
    ['meta', { property: 'og:image', content: 'https://imba97.github.io/smserialport/logo.svg' }],
    ['meta', { property: 'og:url', content: 'https://imba97.github.io/smserialport/' }],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/imba97/smserialport' }
    ],

    search: {
      provider: 'local',
      // TODO: Add Algolia search
      options: algolia
    }
  }
})
