# Linx Commons-js

[![Version][version-img]][package-url] [![CircleCI][circleci-img]][circleci-url] [![Dependencies][david-img]][david-url] [![Dev Dependencies][david-dev-img]][david-dev-url] [![License][license-img]][license-url] [![Downloads][downloads-img]][downloads-url] [![jsDelivr Hits][jsdelivr-img]][jsdelivr-url]

[circleci-img]: https://circleci.com/gh/chaordic/commons-js.svg?style=shield
[circleci-url]: https://circleci.com/gh/chaordic/commons-js
[david-img]: https://img.shields.io/david/chaordic/commons-js.svg
[david-url]: https://david-dm.org/chaordic/commons-js
[david-dev-img]: https://img.shields.io/david/dev/chaordic/commons-js.svg
[david-dev-url]: https://david-dm.org/chaordic/commons-js?type=dev
[version-img]: https://img.shields.io/npm/v/@linx-impulse/commons-js.svg?style=flat-square
[package-url]: https://npmjs.org/package/@linx-impulse/commons-js
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE.txt
[downloads-img]: https://img.shields.io/npm/dm/@linx-impulse/commons-js.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=@linx-impulse/commons-js
[jsdelivr-img]: https://data.jsdelivr.com/v1/package/npm/@linx-impulse/commons-js/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@linx-impulse/commons-js

A library with common function implementations for Javascript Applications.

## Installation

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/@linx-impulse/commons-js/dist/commons.min.js"></script>
```

### npm

```sh
npm install -s @linx-impulse/commons-js
```

## Usage

### Global object

The built file inside `dist` directory have the whole library modules and functions. If you use it from CDN or from your `node_modules` a global object will be created inside `linx` namespace allowing you to use the functions.

Example:

```html
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@linx-impulse/commons-js/dist/commons.min.js"></script>
  </head>
  <body>
    <script>
      // make an ajax request and save the response inside a cookie
      linx.commons.http.ajax({
        url: '//api.example.com',
        params: {
          id: 'someId',
        },
        success: (data) => {
          linx.commons.browser.setCookie('myData', JSON.stringify(data));
        },
      });
    </script>
  </body>
</html>
```

### With Webpack

If your application uses some module bundler, you can import the whole Commons-js library, a single module, or just a single function, making your source code smaller because only the features you need will be concatened to your built application.

The examples below were tested using Webpack, if you use another module bundler things might not work as well as expected.

#### ES Modules (Recommended)

Import the whole library and use it on your app:

```javascript
import { commons } from '@linx/commons-js';

// make an ajax request
commons.http.ajax({
  url: 'http://www.google.com',
  callback: () => {
    console.log('OK');
  }
});
```

Import just the `Http` module. Only the implementation of this module functions will be bundled to your application source code.

```javascript
import { http } from '@linx/commons-js/http';

// make an ajax request
http.ajax({
  url: 'http://www.google.com',
  callback: () => {
    console.log('OK');
  }
});
```

Import just the `ajax` function. Only the implementation of this function will be bundled to your application source code.

```javascript
import { ajax } from '@linx/commons-js/http/ajax';

// make an ajax request
ajax({
  url: 'http://www.google.com',
  callback: () => {
    console.log('OK');
  }
});
```

## Contributing

### Code Style

We follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and use eslint to validate the code. Before push a commit please run `npm run lint` to validate your code.

### Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **generate our change log**.

The Commit Message Guidelines are documented here: https://share.linx.com.br/x/0txLAg.
