module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: ['test/fixtures/**/*.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
};
