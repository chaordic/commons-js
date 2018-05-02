/* eslint-disable no-useless-escape */

/**
 * Set a cookie on the browser
 *
 * @memberof module:@linx/commons-js/browser
 * @method setCookie
 * @param {string} name The name of the cookie
 * @param {string} value The value to set.
 * @param {object} options A key value pair set with method settings.
 * @param {string} options.expires Period to expire the cookie in minutes.
 * @param {string} options.domain The domain to set.
 * @param {string} options.path The path to set.
 * @param {HTMLDocument} [options.document] The document object to use. If not
 *  provided, uses the global `window.top.document`.
 * @param {boolean} options.secure Indicates if the flag secure must be set.
 */
export function setCookie(name, value, options) {
  const opt = options || {};
  const { expires, path, domain, secure } = opt;
  const doc = opt.document || window.top.document;

  let expireDate;
  if (expires !== Infinity && typeof expires === 'number') {
    expireDate = new Date();
    expireDate.setTime(expires.getTime() + (expires * 60 * 1000));
  }

  if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
    throw new TypeError(`invalid cookie name ${name}`);
  }

  const keyValues = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
  ];

  if (expireDate) {
    keyValues.push(`expires=${expireDate}`);
  }

  if (domain) {
    keyValues.push(`domain=${domain}`);
  }

  if (path) {
    keyValues.push(`path=${path}`);
  }

  if (secure) {
    keyValues.push('secure');
  }

  doc.cookie = keyValues.join(';');

  return true;
}

/* eslint-enable no-useless-escape */
