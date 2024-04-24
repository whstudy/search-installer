module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins: [],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-console': 'off',
    'no-restricted-properties': 'off',
    radix: 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
  },
};
