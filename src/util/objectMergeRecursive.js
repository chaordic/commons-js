export function objectMergeRecursive(...args) {
  const [target] = [args];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < args.length; i++) {
    const obj = args[i];

    if (obj) {
      // eslint-disable-next-line no-loop-func
      Object.keys(obj).forEach((key) => {
        if (
          typeof key === 'object'
          && !key.nodeType
          && Object.prototype.toString(key) !== '[object Window]'
        ) {
          target[key] = objectMergeRecursive(target[key], obj[key]);
        } else {
          target[key] = obj[key];
        }
      });
    }
  }

  return target;
}
