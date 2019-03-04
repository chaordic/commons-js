/**
 * Calls functions to prevent further propagation
 * of a given event in the capturing and bubbling phases.
 *
 * @memberof module:@linx/commons-js/browser
 * @method stopPropagation
 * @param {object} event The event whose functions will be called
 */
export function stopPropagation(event) {
  if (event.preventDefault && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }

  if (event.stopPropagation && typeof event.stopPropagation === 'function') {
    event.stopPropagation();
  }

  // eslint-disable-next-line no-param-reassign
  event.cancelBubble = true;
}
