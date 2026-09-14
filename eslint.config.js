import tseslint from 'typescript-eslint'
import base from '@ledhed2222/eslint-config'
import typescript from '@ledhed2222/eslint-config/typescript'
import react from '@ledhed2222/eslint-config/react'
import prettier from '@ledhed2222/eslint-config/prettier'

export default tseslint.config(
  {
    ignores: [
      'build/**',
      'node_modules/**',
      'dist/**',
      // Playwright output; the trace viewer bundles are large and minified,
      // and linting them hangs eslint.
      'test-results/**',
      'playwright-report/**',
      'blob-report/**',
    ],
  },
  ...base,
  ...typescript,
  ...react,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
      },
    },
  },
  ...prettier,
)
