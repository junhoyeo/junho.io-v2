module.exports = {
  plugins: [require('@ianvs/prettier-plugin-sort-imports')],
  importOrder: ['<THIRD_PARTY_MODULES>', '@/(.*)$', '^[./](.*)$'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
