/**
 * Creates and appends an element that links the HTML document to a given file
 * source and sets a callback function to be called once the element finishes
 * loading.
 *
 * @memberof module:@linx/commons-js/util
 * @method loadFile
 * @param {string} source The path to the file that will be loaded.
 * @param {function} callback The function to be called once the
 * element created finishes loading.
 * @param {object} document The document object to be used,
 * defaults to Window.document.
 * @returns {object} The element that was created and appended.
 */
export function loadFile(source, callback, document = window.document) {
  let file;

  if (source.indexOf('.js') !== -1) {
    file = document.createElement('script');
    file.setAttribute('type', 'text/javascript');
    file.setAttribute('async', 'true');
    file.setAttribute('src', source);
  } else if (source.indexOf('.css') !== -1) {
    file = document.createElement('link');
    file.setAttribute('type', 'text/css');
    file.setAttribute('rel', 'stylesheet');
    file.setAttribute('href', source);
  }

  // Append in the HEAD element
  if (file) {
    const [head] = document.getElementsByTagName('head');
    head.appendChild(file);

    if (file.readyState) {
      file.onreadystatechange = () => {
        if (file.readyState === 'loaded' || file.readyState === 'complete') {
          file.onreadystatechange = null;

          if (typeof callback === 'function') {
            callback();
          }
        }
      };
    } else {
      file.onload = () => {
        file.onload = null;

        if (typeof callback === 'function') {
          callback();
        }
      };
    }
  }

  return file;
}
