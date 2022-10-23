module.exports = {
  root: true,
  extends: [
    'turbo',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/next'),
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
  rules: {
    'import/order': 'off',
    'no-constant-binary-expression': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
  },
};
