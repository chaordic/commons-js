import { expect } from 'chai';

import { stringify } from '../../src/query-string/stringify';

describe('query-string/stringify', function () {
  it('should return the link from the object', function () {
    const mockObj = {
      tag: 'true',
      key: ['1', '2'],
    };
    const urlExpected = 'tag=true&key[]=1&key[]=2';
    
    expect(stringify(mockObj))
      .to
      .equal(urlExpected);
  });
});
