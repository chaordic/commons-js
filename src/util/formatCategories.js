function getFirstChild(categories, item) {
  return (categories || []).find(category => (
    !category.used
    && Array.isArray(category.parents)
    && category.parents.indexOf(item.id) !== -1
  ));
}

/**
 * Formats an array of categories passed, sorting them
 * based on hierarchic structure and returns an array
 * of category ids.
 *
 * @memberof module:@linx-impulse/commons-js/util
 * @method formatCategories
 * @param {Array} An array of objects, each consisting of a category
 * with id, name and an array of parents.
 * @returns {Array} An array of strings where each string represents
 * one category id.
 */
export function formatCategories(categories) {
  // check if categories is an array of strings
  if (categories.every(category => typeof category === 'string')) {
    return [categories.join('_')];
  }

  // Filter wrong formatted
  const filteredCategories = (categories || [])
    .filter(category => category && category.id)
    .map(category => ({
      id: category.id,
      parents: category.parents,
    }));

  // Filter the root nodes
  const roots = filteredCategories.filter(category => (
    (
      !category.parents || (
        Array.isArray(category.parents) && !category.parents.length
      )
    )
  ));

  // For each root generate an array of categories
  const result = roots.map((root) => {
    let item = root;
    const ids = [];

    while (typeof item === 'object') {
      ids.push(item.id);
      item.used = true;
      item = getFirstChild(categories, item);
    }

    return ids.join('_');
  });

  return result;
}
