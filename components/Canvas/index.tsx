import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';

import { useShapeStore } from '../../store';
import { shapeArray, storeShapes } from '../../utils/storeShapes';
import styles from './Canvas.module.css';
import { DrawnShape, ShapeCoords } from '../../app/page';

interface CanvasProps {
  deleteById: (arg: number) => void;
  listOfShapes: DrawnShape[];
  setListOfShapes: Dispatch<SetStateAction<DrawnShape[]>>;
}

function Canvas({ deleteById, listOfShapes, setListOfShapes }: CanvasProps) {
  const scale = useShapeStore((state) => state.scale);
  const isDeleteMode = useShapeStore((state) => state.isDeleteMode);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startLocation, setStartLocation] = useState<ShapeCoords | null>(null);
  const [userDrawing, setUserDrawing] = useState<boolean>(false);

  function deleteItem(x: number, y: number) {
    if (!isDeleteMode) return;
    listOfShapes.forEach((shape, id) => {
      shape.forEach((coord) => {
        if (coord.x - x < 15 && coord.y - y < 15) {
          deleteById(id);
        }
      });
    });
  }

  useEffect(() => {
    if (!context || !canvasRef.current) return;
    const skew = Number(`-${(scale - 1) * 400}`);

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.setTransform(scale, 0, 0, scale, skew, skew);

    listOfShapes?.forEach((shape) => {
      context.beginPath();
      shape.forEach((coord) => {
        context.lineTo(coord.x, coord.y);
      });
      context.closePath();
      context.stroke();
    });
  }, [listOfShapes, context, scale]);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Set canvas
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight - 30;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.lineCap = 'round';
    context.strokeStyle = '#1d1c2b';
    context.lineWidth = 5;
    context.imageSmoothingQuality = 'high';
    setContext(context);
  }, []);

  function draw({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) {
    if (!userDrawing || isDeleteMode) return;
    shapeArray(offsetX, offsetY);
    if (!context) return;

    context.lineTo(offsetX, offsetY);
    context.stroke();
  }

  function startDraw({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) {
    if (isDeleteMode) {
      deleteItem(offsetX, offsetY);
      return;
    }
    if (!context) return;

    setStartLocation({ x: offsetX, y: offsetY });
    setUserDrawing(true);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  }

  function finishDraw() {
    if (isDeleteMode || !context || !startLocation) return;
    context.lineTo(startLocation.x, startLocation.y);
    context.stroke();
    context.closePath();
    setUserDrawing(false);
    const arrlist = storeShapes();
    setListOfShapes((prev) => {
      const newArray = [...prev, ...arrlist];
      return newArray;
    });
  }

  return <canvas className={styles.canvas} ref={canvasRef} onMouseMove={draw} onMouseDown={startDraw} onMouseUp={finishDraw} />;
}

export default Canvas;
