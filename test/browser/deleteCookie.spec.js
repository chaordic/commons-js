import { expect } from 'chai';

import { deleteCookie } from '../../src/browser/deleteCookie';

describe('deleteCookie', function () {
  it('should delete a cookie', function () {
    const mockDoc = { cookie: 'myCookie=cookieValue' };
    deleteCookie('myCookie', { document: mockDoc });

    expect(mockDoc.cookie)
      .to
      .equal('myCookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT');
  });
});
