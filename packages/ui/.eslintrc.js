const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'unicorn/filename-case': 'off',
        'react/function-component-definition': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    'no-constant-binary-expression': 'off',
  }
};
