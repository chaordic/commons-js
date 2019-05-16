/**
 * Merges two or more objects, combining common properties. Overwrites
 * the properties from right to left in case of conflicts and ignores parameters
 * (but not properties) that are not objects.
 *
 * @memberof module:@linx/commons-js/util
 * @method objectMergeRecursive
 * @param {...object} source An object to be merged
 * @returns {object} An object containing merged properties of all valid sources
 * given.
 */
export function objectMergeRecursive(...args) {
  const target = args[0] && typeof args[0] === 'object' && !Array.isArray(args[0])
    ? args[0]
    : {};

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < args.length; i++) {
    const source = args[i] && typeof args[i] === 'object' && !Array.isArray(args[i])
      ? args[i]
      : {};

    // eslint-disable-next-line no-loop-func
    Object.keys(source).forEach((key) => {
      if (
        typeof target[key] === 'object' && !Array.isArray(target[key])
        && typeof source[key] === 'object' && !Array.isArray(source[key])
      ) {
        target[key] = objectMergeRecursive(target[key], source[key]);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    });
  }

  return target;
}
