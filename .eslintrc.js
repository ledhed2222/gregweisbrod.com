/* eslint-disable import/unambiguous, import/no-commonjs, import/no-unused-modules --
 * linter config */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  extends: ['@xrplf'],
  rules: {
    'node/no-missing-import': 'off',
    'jsdoc/require-jsdoc': 'off',
    // TODO add to general config
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    'func-style': ['warn', 'expression'],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'node/file-extension-in-import': [
      'error',
      'always',
      {
        '.ts': 'never',
        '.tsx': 'never',
      },
    ],
    'import/no-unassigned-import': [
      'warn',
      {
        allow: ['**/*.css'],
      },
    ],
    'react/require-default-props': 'off',
  },
}
