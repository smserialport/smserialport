import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import sonarjs from 'eslint-plugin-sonarjs'
import tsEslint from '@typescript-eslint/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import vuePaser from 'vue-eslint-parser'

const vueRecommended = [
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    },
    languageOptions: {
      parser: vuePaser,
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  }
]

// @ts-ignore
import tsParse from '@typescript-eslint/parser'

const files = ['**/*.{js,ts,json}']
const ignores = ['**/node_modules/**', '**/dist/**']

export default [
  ...vueRecommended,
  {
    ...eslintPluginPrettierRecommended,
    files,
    ignores
  },
  {
    files,
    ignores,

    languageOptions: {
      parser: tsParse
    },

    plugins: {
      sonarjs,
      tsEslint
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          singleQuote: true,
          semi: false,
          bracketSpacing: true,
          trailingComma: 'none',
          jsxBracketSameLine: false,
          arrowParens: 'always',
          endOfLine: 'auto'
        }
      ]
    }
  }
]
