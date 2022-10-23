module.exports = {
  ...require('@vercel/style-guide/prettier'),
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '@/(.*)$', '^[./](.*)$'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
