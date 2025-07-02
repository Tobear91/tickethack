export function cloneElement(pointer) {
  const elt = document.querySelector(pointer);
  const clone = elt.cloneNode(true);
  clone.classList.remove("ghost");
  return clone;
}
