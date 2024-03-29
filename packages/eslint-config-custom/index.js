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
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-default-export': 'off',
    'import/order': 'off',
    'no-console': 'off',
    'no-constant-binary-expression': 'off',
    'no-empty-function': 'off',
    'no-implicit-coercion': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-key': 'off',
    'react/jsx-sort-props': 'off',
    'react/hook-state': 'off',
    'react/hook-use-state': 'off',
    'unicorn/filename-case': 'off',

    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
