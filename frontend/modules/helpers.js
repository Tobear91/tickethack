export function cloneElement(pointer) {
  const elt = document.querySelector(pointer);
  const clone = elt.cloneNode(true);
  clone.classList.remove("ghost");
  clone.classList.add("cart_trip");
  return clone;
}
