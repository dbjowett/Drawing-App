import { useCallback, useRef } from 'react';
import { ShapeCoords } from '../types';

export const useTempShapes = () => {
  const tempShapes = useRef<ShapeCoords[]>([]);

  const addTempShape = useCallback((point: ShapeCoords) => {
    tempShapes.current.push(point);
  }, []);

  const getTempShapes = useCallback(() => {
    const shapes = [Array.from(tempShapes.current)];
    tempShapes.current = [];
    return shapes;
  }, []);

  return { getTempShapes, addTempShape };
};
