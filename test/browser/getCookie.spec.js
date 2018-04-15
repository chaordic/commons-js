import { expect } from 'chai';

import { getCookie } from '../../src/browser/getCookie';

describe('getCookie', function () {
  it('should return the value of a defined cookie', function () {
    const mockDoc = {
      cookie: 'browserId=browserId; uid=uid',
    };

    return expect(getCookie('browserId', { document: mockDoc }))
      .to
      .equal('browserId');
  });

  it('should return undefined if the cookie not exists', function () {
    const mockDoc = {
      cookie: 'browserId=browserId; uid=uid',
    };

    return expect(getCookie('noCookie', { document: mockDoc }))
      .to
      .be
      .undefined;
  });

  it('should get value of uri encoded cookie name', function () {
    const mockDoc = {
      cookie: 'encoded%20cookie=cookie; uid=uid',
    };

    return expect(getCookie('encoded cookie', { document: mockDoc }))
      .to
      .equal('cookie');
  });

  it('should uri decode cookie value', function () {
    const mockDoc = {
      cookie: 'clickUrl=http%3A%2F%2Flocalhost%3A1319%2Fv1%2Fevents%2Fclick%2F%3FclickId%3DCgtu%3D; uid=uid',
    };

    return expect(getCookie('clickUrl', { document: mockDoc }))
      .to
      .equal('http://localhost:1319/v1/events/click/?clickId=Cgtu=');
  });
});
