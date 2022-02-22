const arr = [];
//OnDraw
export const shapeArray = (x, y) => {
  arr.push({ x, y });
};

export const arrlist = [];
/// OnMouseOff
export const storeShapes = () => {
  arrlist.push(arr);
  arr = [];
  return arrlist;
};
