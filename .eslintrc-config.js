module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'no-unused-expressions': 'error',
    'no-unreachable': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    process: 'readonly',
  },
};
