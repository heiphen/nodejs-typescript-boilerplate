module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'linebreak-style': 0,
    'no-unused-vars': 1,
    'no-useless-escape': 0,
    radix: ['error', 'as-needed'],
    'no-param-reassign': 0,
    camelcase: 0,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'consistent-return': 0,
  },
};
