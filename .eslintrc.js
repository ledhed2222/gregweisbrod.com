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
    'jsdoc/require-jsdoc': 'off',
    '@typescript-eslint/naming-convention': 'off',

    // TODO can't figure out how to get this to work with tsx
    '@typescript-eslint/no-unused-vars-experimental': 'off',
  },
}
