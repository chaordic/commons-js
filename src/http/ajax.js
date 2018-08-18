/*
 * Linx commons-js.
 *
 * A library with common functions implementations for javascript applications.
 *
 * Copyright (c) 2018 - Linx S.A
 *
 * LICENSE: This software is the confidential and proprietary information of
 * Linx S.A ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Linx S.A.
 */

function arrayToQueryParams(key, values) {
  return values
    .map(val => `${key}[]=${encodeURIComponent(val)}`)
    .join('&');
}

function serializeParams(params) {
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

/**
 * Default ajax request.
 *
 * @memberof module:@linx/commons-js/http
 * @method ajax
 * @param {object} options A set of key/value pairs that configure
 *          the Ajax request.
 * @param {object} options.url A string containing the URL to
 *          which the request is sent. This parameter is obrigatory.
 * @param {object} [options.type=GET] The method of request.
 * @param {object} options.params Url query params.
 * @param {object} options.data Data to be sent to the server.
 *          It is converted to a query string,
 * @param {function} options.callback A function to execute always when
 *          the request is finished.
 * @param {function} options.success A function to execute when the request
 *          is successfully finished.
 * @param {function} options.error A function to execute when some error
 *          occurs on request.
 * @param {number} [options.timeout] Specifies the number of milliseconds before
 *          the request times out. If the request takes longer than `timeout`,
 *          the request will be aborted. If not provided the request will wait
 *          indefinitely.
 */
export function ajax(options) {
  const callback = (typeof options.callback === 'function')
    ? options.callback
    : () => { };

  const success = (typeof options.success === 'function')
    ? options.success
    : () => { };

  const error = (typeof options.error === 'function')
    ? options.error
    : () => { };

  const requestData = (typeof options.data === 'object') ? options.data : {};

  const params = (typeof options.params === 'object') ? options.params : {};

  const requestMethod = (
    options.type === undefined
    || (
      options.type.toUpperCase() !== 'GET'
      && options.type.toUpperCase() !== 'POST'
      && options.type.toUpperCase() !== 'PUT'
      && options.type.toUpperCase() !== 'DELETE'
    )
  ) ? 'GET' : options.type.toUpperCase();

  if (typeof options.url !== 'string' && options.url === '') {
    return;
  }

  const queryParams = serializeParams(params);
  const queryConnector = options.url.indexOf('?') >= 0 ? '&' : '?';
  const url = `${options.url}${queryConnector}${queryParams}`;

  const { timeout = 0 } = options;

  const xhr = new XMLHttpRequest();
  xhr.open(requestMethod, url, true);

  xhr.onload = (res) => {
    const { status } = res.target;
    let responseData;

    try {
      responseData = JSON.parse(xhr.response);
    } catch (e) {
      responseData = xhr.response;
    }

    if (status >= 200 && status < 300) {
      callback(responseData);
      success(responseData);
    } else {
      callback({ status, statusText: xhr.statusText });
      error({ status, statusText: xhr.statusText });
    }
  };

  xhr.onerror = (res) => {
    const { status } = res.target;

    callback({ status, statusText: xhr.statusText });
    error({ status, statusText: xhr.statusText });
  };

  xhr.timeout = timeout;
  xhr.ontimeout = (err) => {
    callback(err);
    error(err);
  };

  if (requestMethod !== 'GET') {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(serializeParams(requestData));
  } else {
    xhr.send();
  }
}
