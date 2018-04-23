import t from 'prop-types';

export const DataTableDataItem = t.shape({
  id: t.oneOfType([
    t.string,
    t.number,
  ]).isRequired,
  name: t.string,
  status: t.string
});
export const DataTableData = t.arrayOf(DataTableDataItem);
