const pastDate = 'expires=Thu, 01 Jan 1970 00:00:01 GMT';

/**
 * Deletes a page cookie.
 *
 * @memberof module:@linx/commons-js/browser
 * @method deleteCookie
 * @param {string} name The cookie name.
 * @param {object} options A key value pair set with method settings.
 * @param {string} options.domain The domain to set.
 * @param {string} options.path The path to set.
 * @param {HTMLDocument} [options.document] The document object to use. If not
 *  provided, uses the global `window.top.document`.
 */
export function deleteCookie(name, options) {
  const opt = options || {};
  const { domain, path } = opt;
  const doc = opt.document || window.top.document;
  const keyValues = [`${name}=`, pastDate];

  if (domain) {
    keyValues.push(`domain=${domain}`);
  }

  if (path) {
    keyValues.push(`path=${path}`);
  }

  doc.cookie = keyValues.join(';');
}
