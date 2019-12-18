function arrayToQueryParams(key, values) {
  return values
    .map(val => `${key}[]=${encodeURIComponent(val)}`)
    .join('&');
}

/**
 * From an object with the url parameters concatenate
 * all in one string
 *
 * @memberof module:@linx-impulse/commons-js/query-string
 * @method stringify
 * @param {object} params The object to be transformed in string
 * @returns {string} The object parameters in the url format
 */

export function stringify(params) {
  return (Object.keys(params) || [])
    .map((param) => {
      if (Array.isArray(params[param])) {
        return arrayToQueryParams(param, params[param]);
      } if (params[param]) {
        return `${param}=${encodeURIComponent(params[param])}`;
      }

      return null;
    })
    .filter(token => !!token)
    .join('&');
}
