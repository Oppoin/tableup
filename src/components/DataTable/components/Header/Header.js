import React from 'react';
import t from 'prop-types';

import Search from './components/Search/Search.js';

const Header = ({
  onQuerySeach,
  querySearchDebounceTime,
  querySearchHintText,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row-reverse'
    }}>
      <Search
        onQuerySeach={onQuerySeach}
        querySearchDebounceTime={querySearchDebounceTime}
        querySearchHintText={querySearchHintText}
      />
    </div>
  );
};

Header.propTypes = {
  onQuerySeach: t.func.isRequired,
  querySearchDebounceTime: t.number,
  querySearchHintText: t.string,
};

Header.defaultProps = {
  onQuerySeach: () => {},
  querySearchDebounceTime: 0,
  querySearchHintText: 'Search',
};

export default Header;
