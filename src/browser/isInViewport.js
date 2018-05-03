export function isInViewport(el, options) {
  const opt = options || {};

  const win = opt.window || window;
  const doc = opt.document || document;
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (
      win.innerHeight ||
      doc.documentElement.clientHeight
    ) &&
    rect.right <= (
      win.innerWidth ||
      doc.documentElement.clientWidth
    )
  );
}
