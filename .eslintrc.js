module.exports = {
  env: {
    node: true,
  },
  plugins: ['simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
};
