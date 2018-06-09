import t from 'prop-types';

export const dataValueType = t.shape({
  id: t.oneOfType([
    t.string,
    t.number,
  ]).isRequired,
  name: t.string,
  status: t.string,
});
export const dataValuesType = t.arrayOf(dataValueType);

export const dataColumnType = t.shape({
  key: t.string.isRequired,
  label: t.string.isRequired,
  numberic: t.bool,
});
export const dataColumnsType = t.arrayOf(dataColumnType);

export const dataType = t.shape({
  values: dataValuesType,
  columns: dataColumnsType,
});
