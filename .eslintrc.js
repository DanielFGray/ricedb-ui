module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb',
    'airbnb/hooks',
    // 'prettier/@typescript-eslint',
    // 'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js'],
    },
    'import/resolver': {
      // typescript: {
      //   alwaysTryTypes: true,
      // },
    },
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    semi: ['error', 'never'],
    indent: ['error', 2, { flatTernaryExpressions: true }],
    'no-unexpected-multiline': 'error',
    'no-nested-ternary': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'space-unary-ops': ['error', { overrides: { '!': true } }],
    'object-curly-newline': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'valid-jsdoc': 'warn',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-ignore': 'warn',
  },
}
