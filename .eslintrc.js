module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },

  env: {
    es6: true,
    browser: true,
  },

  extends: ['@xrplf'],

  rules: {
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'jsdoc/require-jsdoc': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
}
