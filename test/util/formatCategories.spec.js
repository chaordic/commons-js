import { expect, sinon } from '../globals';
import { formatCategories } from '../../src/util/formatCategories';

describe('util/formatCategories', function() {
  it('should return an array of category trees', function() {
    const mockCategories = [
      { id: 'cat-01', name: 'category-01' },
    ];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['cat-01']);
  });

  it('should return an array with a single string when categories is an array of strings', function () {
    const mockCategories = ['category-01', 'category-02', 'category-03'];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['category-01_category-02_category-03']);
  });

  it('should sort categories with parents first', function() {
    const mockCategories = [
      { id: 'cat-01', name: 'category-01', parents: ['cat-02'] },
      { id: 'cat-02', name: 'category-02' }
    ];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['cat-02_cat-01']);
  });

  it('should remove children outside of first parent tree', function() {
    const mockCategories = [
      { id: 'cat-01', name: 'category-01', parents: ['cat-02'] },
      { id: 'cat-02', name: 'category-02' },
      { id: 'cat-03', name: 'category-03', parents: ['cat-02'] },
    ];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['cat-02_cat-01']);
  });

  it('should one string for each parent tree', function() {
    const mockCategories = [
      { id: 'cat-01', name: 'category-01' },
      { id: 'cat-02', name: 'category-02', parents: ['cat-01', 'cat-04'] },
      { id: 'cat-03', name: 'category-03', parents: ['cat-02'] },
      { id: 'cat-04', name: 'category-04' },
      { id: 'cat-05', name: 'category-05', parents: ['cat-04'] },
      { id: 'cat-06', name: 'category-06', parents: ['cat-05'] },
    ];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['cat-01_cat-02_cat-03', 'cat-04_cat-05_cat-06']);
  });

  it('should return one string for each category without parents', function() {
    const mockCategories = [
      { id: 'cat-01', name: 'category-01' },
      { id: 'cat-02', name: 'category-02', parents: ['cat-01'] },
      { id: 'cat-03', name: 'category-03' },
      { id: 'cat-04', name: 'category-04' },
      { id: 'cat-05', name: 'category-05' },
      { id: 'cat-06', name: 'category-06' },
    ];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['cat-01_cat-02', 'cat-03', 'cat-04', 'cat-05', 'cat-06']);
  });

  it('should remove all cycles found in the parent tree', function() {
    const mockCategories = [
      { id: 'cat-01', name: 'category-01', parents: ['cat-01'] },
      { id: 'cat-02', name: 'category-02', parents: ['cat-03'] },
      { id: 'cat-03', name: 'category-03', parents: ['cat-02'] },
      { id: 'cat-04', name: 'category-04', parents: ['cat-05'] },
      { id: 'cat-05', name: 'category-05', parents: ['cat-06'] },
      { id: 'cat-06', name: 'category-06', parents: ['cat-04'] },
      { id: 'cat-07', name: 'category-07' },
    ];

    const result = formatCategories(mockCategories);
    expect(result).to.deep.equal(['cat-07']);
  });
});
