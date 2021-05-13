'use strict';

module.exports = {
  root: true,
  extends: ['ash-nazg/sauron-node-overrides'],
  settings: {
    polyfills: [
      'Date.now'
    ]
  },
  env: {
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  overrides: [
    {
      files: '*.md/*.js',
      globals: {
        doSomething: 'readonly'
      },
      rules: {
        'import/no-unresolved': ['error', {
          ignore: ['set-safer-interval']
        }],
        'no-unused-vars': ['error', {
          varsIgnorePattern: 'setSaferInterval|clear'
        }]
      }
    }
  ],
  rules: {
  }
};
