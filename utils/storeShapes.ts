interface Shape {
  x: number;
  y: number;
}

let arr: Shape[] = [];
//OnDraw
export const shapeArray = (x, y) => {
  arr.push({ x, y });
};

/// OnMouseOff
export const storeShapes = () => {
  let arrlist: Shape[][] = [];
  arrlist.push(arr);
  arr = [];
  return arrlist;
};
