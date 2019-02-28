export function loadFile(source, callback) {
  let file;

  if (source.includes('.js')) {
    file = document.createElement('script');
    file.setAttribute('type', 'text/javascript');
    file.setAttribute('async', 'true');
    file.setAttribute('src', source);
  } else if (source.includes('.css')) {
    file = document.createElement('link');
    file.setAttribute('rel', 'stylesheet');
    file.setAttribute('type', 'text/css');
    file.setAttribute('href', source);
  }

  // Append in the HEAD element
  if (file) {
    document.getElementsByTagName('head')[0].appendChild(file);

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
