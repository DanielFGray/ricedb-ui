module.exports = {
  parser: 'babel-eslint',
  extends: [
    'react-app',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: [
    'jsx-a11y',
    'prettier',
  ],
  env: {
    browser: true,
  },
  rules: {
    semi: ['error', 'never'],
    indent: ['error', 2, { flatTernaryExpressions: true }],
    'no-unexpected-multiline': 'error',
    'no-nested-ternary': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'space-unary-ops': ['error', { overrides: { '!': true } }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_\\d*$' }],
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': ['enforce', {
      explicitSpread: 1,
    }],
  },
}
