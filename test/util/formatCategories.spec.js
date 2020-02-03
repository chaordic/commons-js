import { expect, sinon } from '../globals';
import { formatCategories } from '../../src/util/formatCategories';

describe('util/formatCategories', function() {
  it('should return an array of category ids', function () {
    const mockCategories = [
      { id: 'cat-01', name: 'category-01' },
    ];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['cat-01']);
  });

  it('should sort categories with parents first', function () {
    const mockCategories = [
      { id: 'cat-01', name: 'category-01', parents: ['cat-02'] },
      { id: 'cat-02', name: 'category-02' }
    ];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['cat-02', 'cat-01']);
  });

  it('should remove categories outside of first parent tree', function() {
    const mockCategories = [
      { id: 'cat-01', name: 'category-01', parents: ['cat-02'] },
      { id: 'cat-02', name: 'category-02' },
      { id: 'cat-03', name: 'category-03', parents: ['cat-02'] },
      { id: 'cat-04', name: 'category-04' },
    ];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['cat-02', 'cat-01']);
  })
});
