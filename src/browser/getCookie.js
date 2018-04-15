/* eslint-disable no-useless-escape */

/**
 * Returns a cookie value by its name
 *
 * @memberof module:@linx/commons-js/browser
 * @method getCookie
 * @param {string} name The name of cookie to get
 * @param {object} options A list of key-value pair options.
 * @param {HTMLDocument} [options.document] The document object to use. If not
 *  provided, uses the global `window.top.document`.
 */
export function getCookie(name, options) {
  const opt = options || {};
  const doc = opt.document || window.top.document;

  let regex = '(?:(?:^|.*;)\\s*';
  regex += encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&');
  regex += '\\s*\\=\\s*([^;]*).*$)|^.*$';

  let value = doc.cookie.replace(new RegExp(regex), '$1');
  value = decodeURIComponent(value);

  return value || undefined;
}

/* eslint-enable no-useless-escape */
