import { expect } from 'chai';

import { parse } from '../../src/query-string/parse';

describe('query-string/parse', function () { 
  it('should return the object with the value of a defined parameter', function () {
    const objExpected = {
      tag: 'true',
      flag: 'false',
    };
    const mockQuery = 'tag=true&flag=false';

    expect(parse(mockQuery))
      .to
      .deep
      .equal(objExpected);
  });

  it('should return the object with the arrays of the defined parameters', function () {
    const objExpected = {
      tag: ['AF', 'XD'],
      'key[]': ['1', '2'],
    };
    const mockQuery = 'tag=AF&key[]=1&key[]=2&tag=XD';

    expect(parse(mockQuery))
      .to
      .deep
      .equal(objExpected);
  });

  it('should return the object with empty parameter as {}', function () {
    const objExpected = {
      tag: '',
      key: '2',
    };
    const mockQuery = 'tag=&key=2';

    expect(parse(mockQuery))
      .to
      .deep
      .equal(objExpected);
  });

  it('should return the {} object, doesnt have parameters', function () {
    const objExpected = {};
    const mockQuery = '';

    expect(parse(mockQuery))
      .to
      .deep
      .equal(objExpected);
    
    expect(parse(mockQuery.slice(0,-1)))
      .to
      .deep
      .equal(objExpected);
  });

  it('should return the object with the value of the encoded parameters', function () {
    const objExpected = {
      tag: 'true',
      flag: 'false',
    };

    const mockQuery = encodeURIComponent('tag') + '=' + encodeURIComponent('true') + '&' + encodeURIComponent('flag') + '=' + encodeURIComponent('false');

    expect(parse(mockQuery))
      .to
      .deep
      .equal(objExpected);
  });
});
