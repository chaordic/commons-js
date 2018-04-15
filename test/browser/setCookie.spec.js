import { expect } from 'chai';

import { setCookie } from '../../src/browser/setCookie';

describe('setCookie', function () {
  it('should set a cookie value', function () {
    const mockDoc = { };
    setCookie('myCookie', 'cookieValue', { document: mockDoc });
    expect(mockDoc.cookie)
      .to
      .equal('myCookie=cookieValue');
  });
});
