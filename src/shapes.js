import t from 'prop-types';

export const dataItemType = t.shape({
  id: t.oneOfType([
    t.string,
    t.number,
  ]).isRequired,
  name: t.string,
  status: t.string,
});
export const dataArrayType = t.arrayOf(dataItemType);

export const dataColumnType = t.shape({
  key: t.string.isRequired,
  label: t.string.isRequired,
  numberic: t.bool,
});
export const dataColumnsType = t.arrayOf(dataColumnType);
