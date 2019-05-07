import { expect } from 'chai';

import { objectMergeRecursive } from '../../src/util/objectMergeRecursive';

describe('objectMergeRecursive', function() {
  it('should merge the objects', function() {
    const mockObj1 = { a: 1, b: 2 };
    const mockObj2 = { c: 5, d: 6 };
    const expectedObj = { a: 1, b: 2, c: 5, d: 6 };
    
    expect(objectMergeRecursive(mockObj1, mockObj2)).to.deep.equal(expectedObj);
  });

  it('should overwrite the leftmost parameter if it conflicts with the next', function() {
    const mockObj1 = { a: 1, b: 2 };
    const mockObj2 = { b: 3, c: 4 };
    const mockObj3 = { c: 5, d: 6 };
    const expectedObj = { a: 1, b: 3, c: 5, d: 6 };

    expect(objectMergeRecursive(mockObj1, mockObj2, mockObj3)).to.deep.equal(expectedObj);
  });
  
  it('should not overwrite the leftmost parameter if the next is undefined', function() {
    const mockObj1 = { a: 1, b: 2 };
    const mockObj2 = { b: undefined, c: 4 };
    const expectedObj = { a: 1, b: 2, c: 4 };

    expect(objectMergeRecursive(mockObj1, mockObj2)).to.deep.equal(expectedObj);
  });

  it('should merge nested properties that are objects', function() {
    const mockObj1 = { a: 1, b: { c: 2, d: 3 } };
    const mockObj2 = { b: { c: 'some-string', d: { e: 0 } } };
    const mockObj3 = { f: { g: 4 } };
    const expectedObj = { a: 1, b: { c: 'some-string', d: { e: 0 } }, f: { g: 4 } };

    expect(objectMergeRecursive(mockObj1, mockObj2, mockObj3)).to.deep.equal(expectedObj);
  });

  it('should overwrite array parameters', function() {
    const mockObj1 = [1];
    const mockObj2 = { a: 0 };
    let expectedObj = { a: 0 };

    expect(objectMergeRecursive(mockObj1, mockObj2)).to.deep.equal(expectedObj);

    const mockObj3 = [1,2];
    const mockObj4 = [3,4];
    expectedObj = [3,4];

    expect(objectMergeRecursive(mockObj3, mockObj4)).to.deep.equal(expectedObj);

    const mockObj5 = { a: [1, 2], b: 1 };
    const mockObj6 = { a: [3, 4], b: 3 };
    expectedObj = { a: [3, 4], b: 3}

    expect(objectMergeRecursive(mockObj5, mockObj6)).to.deep.equal(expectedObj);
  });

  it('should mutate the first parameter with the result if that parameter is an object', function() {
    const mockObj1 = { a: 1, b: 2 };
    const mockObj2 = { c: 5, d: 6 };
    const expectedObj = { a: 1, b: 2, c: 5, d: 6 };
    
    const result = objectMergeRecursive(mockObj1, mockObj2);

    expect(result).to.equal(mockObj1);
    expect(result).to.deep.equal(expectedObj);
  });

  it('should not mutate the first parameter with the result if that parameter is an array', function() {
    const mockObj1 = [1];
    const mockObj2 = { a: 0 };
    const expectedObj = { a: 0 };

    const result = objectMergeRecursive(mockObj1, mockObj2);

    expect(result).to.not.equal(mockObj1);
    expect(result).to.deep.equal(expectedObj);
  });

  it('should not break when receiving undefined or null parameters', function() {
    const mockObj1 = { a: 1 };
    const mockObj2 = { a: { b: 2 } };

    let result = objectMergeRecursive(mockObj1);
    expect(result).to.deep.equal(mockObj1);

    result = objectMergeRecursive(mockObj1, undefined);
    expect(result).to.deep.equal(mockObj1);

    result = objectMergeRecursive(undefined, mockObj1);
    expect(result).to.deep.equal(mockObj1);

    result = objectMergeRecursive(mockObj1, undefined, mockObj2);
    expect(result).to.deep.equal(mockObj2);
  });

});
