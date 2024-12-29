import { useRef } from 'react';
import { ShapeCoords } from '../types';

export const useTempShapes = () => {
  const tempShapes = useRef<ShapeCoords[]>([]);

  const addTempShape = (shapes: ShapeCoords) => tempShapes.current.push(shapes);

  const getTempShapes = () => {
    let arrlist: ShapeCoords[][] = [];
    arrlist.push(tempShapes.current);
    tempShapes.current = [];
    return arrlist;
  };
  return { getTempShapes, addTempShape };
};
