module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "airbnb"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-elements-interaction': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx/one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'semi': 'off',
    'no-param-reassign': ["error", { "props": false }]
  },
};
