import { defineConfig } from 'eslint/config'
import base from '@ledhed2222/eslint-config'
import typescript from '@ledhed2222/eslint-config/typescript'
import react from '@ledhed2222/eslint-config/react'
import prettier from '@ledhed2222/eslint-config/prettier'

export default defineConfig(
  {
    ignores: [
      'build/**',
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
  ...prettier,
)
