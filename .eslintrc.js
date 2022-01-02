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

    // TODO these need to be factored in to the general config
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'node/no-missing-import': [
      2,
      {
        tryExtensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'node/file-extension-in-import': 'off',
    'import/no-unassigned-import': [
      1,
      {
        allow: ['**/*.scss'],
      },
    ],
    'react/require-default-props': 'off',

    // TODO can't figure out how to get this to work with tsx
    '@typescript-eslint/no-unused-vars-experimental': 'off',
  },
}
