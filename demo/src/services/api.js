// In our example, we are using window.fetch with jsonapi specification,
// Tableup is request type agnostic so feel free to use what best suits your API.
// As long as you are providing the right data to the library itself,
// it should work! (if not please open a PR, thanks!)

// https://github.com/github/fetch#handling-http-error-statuses
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/vnd.api+json', // http://jsonapi.org/ specification
  },
  // https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
  credentials: 'omit', // omit | same-origin | include
};

export function handleFetch(url, options = {}, callback) {
  const myOptions = {...defaultOptions, ...options};
  console.log('myOptions', myOptions);
  window.fetch(url, {...defaultOptions, ...options})
    .then(checkStatus)
    .then(response => response.json())
    .then(json => callback(json));
}
