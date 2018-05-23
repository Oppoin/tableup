import {BASE_URL} from '../constants';
import fetch from 'isomorphic-fetch';

// fetch rows based on number of page selected, rows per page and search query
const getRows = (options, callback) => {
    let {rowsPerPage, page, query} = options
    if (typeof page === 'number') page = page + 1
    const url = `${BASE_URL}?${page ? `page=${page}` : ''}${rowsPerPage ? `&per_page=${rowsPerPage}` : ''}${query ? `&filter{username.icontains}=${query}` : ''}`
    
    return fetch(url, {
      headers: new Headers({
        'Content-Type' : 'application/vnd.api+json'
      })
    })
    .then(response => response.json())
  }

  export default {
    getRows
  }