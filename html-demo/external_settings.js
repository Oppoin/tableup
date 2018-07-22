'use strict';

(function(){
  const apiUrl = 'http://apiplaceholder.oppoin.com/users/';

  const filter = {username: ''};
  let triggerUpdate; // filled in onMount;

  // use global variable 'settings'
  window.settings = {
    title: 'My table in html',
    palette: {
      'type': 'dark', // ['light' | 'dark']
      'primary': {
        'main': '#470da0'
      },
      'secondary': {
        'main': '#72ff00'
      }
      // 'text': {
      //   'primary': 'rgba(0, 0, 0, 0.87)',
      //   'secondary': 'rgba(0, 0, 0, 0.54)',
      //   'disabled': 'rgba(0, 0, 0, 0.38)',
      //   'hint': 'rgba(0, 0, 0, 0.38)',
      // },
      // 'background': {
      //   'default': '#fafafa',
      // },
      // 'action': {
      //   'active': 'rgba(0, 0, 0, 0.54)',
      //   'hover': 'rgba(0, 0, 0, 0.08)',
      //   'hoverOpacity': 0.08,
      //   'selected': 'rgba(0, 0, 0, 0.14)',
      //   'disabled': 'rgba(0, 0, 0, 0.26)',
      //   'disabledBackground': 'rgba(0, 0, 0, 0.12)',
      // },
      // read more about material-ui palette here:
      // https://material-ui.com/customization/themes/#palette
    },
    data: {
      values: [],
      columns: [
        {key: 'attributes.username', label: 'Username'},
        {key: 'attributes.email',    label: 'Email'},
        {key: 'attributes.age',      label: 'Age',       numeric: true},
        {key: 'attributes.sex',      label: 'Sex'},
        {key: 'attributes.address',  label: 'Address'}
      ]
    },
    selection: {
      enabled: true,
      handleDelete: handleDelete,
      additionalActions: [
        {label: 'Additional action 1', handle: handleAdditionalAction1},
        {label: 'Additional action 2', handle: handleAdditionalAction2},
        {label: 'Additional action 3', handle: handleAdditionalAction3}
      ],
    },
    querySearch: {
      enabled: true,
      hintText: 'Search',
      debounceTime: 200,
      onSearch: handleQuerySeach
    },
    pagination: {
      enabled: true,
      page: 1,
      startingPage: 1,
      total: 0,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20, 30],
      onChangePage: handleChangePage,
      onChangeRowsPerPage: handleChangeRowsPerPage
    },
    onMount: function(updater) {
      triggerUpdate = updater;
      loadData();
    }
  };

  function loadData() {
    let url = apiUrl;
    // filter
    if (filter.username) {
      url = `${url}?filter{username.icontains}=${filter.username}&`;
    } else {
      url = `${url}?`;
    }
    // page
    url = `${url}page=${settings.pagination.page}&`;
    // perPage
    url = `${url}per_page=${settings.pagination.rowsPerPage}`;

    $.ajax({url: url}).done(function(response) {
      settings.data.values = response.data;
      settings.pagination.total = response.meta.pagination.count;

      triggerUpdate();
    });
  }

  // TODO
  function handleDelete(selectedIds) {
    console.log('handleDelete', selectedIds);
  }

  // TODO
  function handleAdditionalAction1(selectedIds) {
    console.log('handleAdditionalAction1', selectedIds);
  }

  // TODO
  function handleAdditionalAction2(selectedIds) {
    console.log('handleAdditionalAction2', selectedIds);
  }

  // TODO
  function handleAdditionalAction3(selectedIds) {
    console.log('handleAdditionalAction3', selectedIds);
  }

  function handleQuerySeach(query) {
    settings.pagination.page = 1; // reset
    filter.username = query;
    loadData();
  }

  function handleChangePage(e, page) {
    settings.pagination.page = page;
    loadData();
  }

  function handleChangeRowsPerPage(e) {
    settings.pagination.page = 1; // reset
    settings.pagination.rowsPerPage = e.target.value;
    loadData();
  }
})();
