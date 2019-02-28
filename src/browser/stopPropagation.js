export function stopPropagation(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }

  if (event.stopPropagation) {
    event.stopPropagation();
  }

  // eslint-disable-next-line no-param-reassign
  event.cancelBubble = true;
}
