module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  'rules': {
    'require-jsdoc' : 0,
    'react/react-in-jsx-scope': 'off',
    'camelcase': 'error',
    'spaced-comment': 'error',
    'quotes': ['error', 'single'],
    'no-duplicate-imports': 'error',
  },
  'settings': {
    'import/resolver': {
      'typescript': {}
    }
  },
};