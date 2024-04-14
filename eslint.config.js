import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import sonarjs from 'eslint-plugin-sonarjs'
import tsEslint from '@typescript-eslint/eslint-plugin'

// @ts-ignore
import tsParse from '@typescript-eslint/parser'

export default [
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,ts,json}'],

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
