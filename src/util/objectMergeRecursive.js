/**
 * Merges two or more objects, combining common properties. Overwrites
 * the properties from right to left in case of conflicts and concatenates
 * properties that are all arrays.
 *
 * @memberof module:@linx/commons-js/util
 * @method objectMergeRecursive
 * @param {...object} source An object or array to be merged
 * @returns {object} An object containing merged properties of all sources
 * given.
 */
export function objectMergeRecursive(...args) {
  let [target] = args;

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < args.length; i++) {
    const source = args[i];

    if (Array.isArray(source)) {
      target = (target || []).concat(source);
    } else {
      if (Array.isArray(target) || target === undefined) {
        target = {};
      }

      // eslint-disable-next-line no-loop-func
      Object.keys(source).forEach((key) => {
        if (typeof target[key] === 'object' && typeof source[key] === 'object') {
          target[key] = objectMergeRecursive(target[key], source[key]);
        } else if (source[key] !== undefined) {
          target[key] = source[key];
        }
      });
    }
  }

  return target;
}
