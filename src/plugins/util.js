export function checkObjectIsEmpty(obj) {
  let arr = Object.keys(obj);
  if (arr.length > 0) return true;
  return false;
}