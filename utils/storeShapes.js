const arr = [];
//OnDraw
export const shapeArray = (x, y) => {
  arr.push({ x, y });
};

/// OnMouseOff
export const storeShapes = () => {
  let arrlist = [];
  arrlist.push(arr);
  arr = [];
  return arrlist;
};
