import ashNazg from 'eslint-config-ash-nazg';

export default [
  ...ashNazg(['sauron', 'node']),
  {
    files: ['**/*.md/*.js'],
    languageOptions: {
      globals: {
        doSomething: 'readonly'
      }
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
];
