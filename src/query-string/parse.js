function addToObj(parameters, key, value) {
  const innerObj = parameters;
  const decodedValue = decodeURIComponent(value);
  const decodedKey = decodeURIComponent(key);

  if (typeof innerObj[decodedKey] === 'string') {
    innerObj[decodedKey] = [innerObj[decodedKey], decodedValue];
  } else if (Array.isArray(innerObj[decodedKey])) {
    innerObj[decodedKey].push(decodedValue);
  } else if (decodedKey) {
    innerObj[decodedKey] = decodedValue;
  }
  return innerObj;
}

/**
 * Parse a query string and return the object with
 * the parameters and values
 *
 * @memberof module:@linx/commons-js/query-string
 * @method parse
 * @param {string} query The query to be parsed
 * @returns {object} parameters The object to be returned with the parameters
 */
export function parse(query) {
  if (typeof query !== 'string') {
    return {};
  }

  const arrayVars = query.split('&');

  return arrayVars.reduce((parameters, element) => {
    const [key, value] = element.split('=');
    return addToObj(parameters, key, value);
  }, {});
}
