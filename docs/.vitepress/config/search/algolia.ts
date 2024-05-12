import type { DefaultTheme } from 'vitepress'

import { search as zhSearch } from '../locales/zh'

export const algolia = {
  appId: '7H1MB42335',
  apiKey: '649555b054cd3a2466029d524585053b',
  indexName: 'smserialport',
  locales: zhSearch
} as DefaultTheme.AlgoliaSearchOptions
