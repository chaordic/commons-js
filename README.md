# Linx Commons-js [![CircleCI](https://circleci.com/gh/chaordic/commons-js.svg?style=svg&circle-token=4e1b37eea33f5e0f790268381b7883bb73972356)](https://circleci.com/gh/chaordic/commons-js)

A library with common function implementations for Javascript Applications.

## Usage

### With Webpack

If your application uses some module bundler, you can import the whole Commons-js library, a single module, or just a single function, making your source code smaller because only the features you need will be concatened to your build application.

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

#### CommonJS Modules

The Commons always exports the main module/function as default export of a file, so if your application uses `CommonJS` syntax, you can require the default module of each file.

Examples:

Require the whole library and use it on your app:

```javascript
const commons = require('@linx/commons-js');

// make an ajax request
commons.http.ajax({
  url: 'http://www.google.com',
  callback: () => {
    console.log('OK');
  }
});
```

Require just the `Http` module. Only the implementation of this module functions will be bundled to your application source code.

```javascript
const http = require('@linx/commons-js/http');

// make an ajax request
http.ajax({
  url: 'http://www.google.com',
  callback: () => {
    console.log('OK');
  }
});
```

Require just the `ajax` function. Only the implementation of this function will be bundled to your application source code.

```javascript
const ajax = require('@linx/commons-js/http/ajax');

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
