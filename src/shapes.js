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
