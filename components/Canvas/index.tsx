import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { DrawnShape, ShapeCoords } from '../../pages';
import { shapeArray, storeShapes } from '../../utils/storeShapes';
import styles from './Canvas.module.css';

interface CanvasProps {
  isDeleteMode: boolean;
  scale: number;
  deleteById: (arg: number) => void;
  listOfShapes: DrawnShape[];
  setListOfShapes: Dispatch<SetStateAction<DrawnShape[]>>;
}

function Canvas({ isDeleteMode, scale, deleteById, listOfShapes, setListOfShapes }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startLocation, setStartLocation] = useState<ShapeCoords>(null);
  const [userDrawing, setUserDrawing] = useState<boolean>(false);

  function deleteItem(x, y) {
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
    if (!context) return;
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
    // Set canvas
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight - 30;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = '#1d1c2b';
    context.lineWidth = 5;
    context.imageSmoothingQuality = 'high';
    setContext(context);
  }, []);

  function draw({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) {
    if (!userDrawing || isDeleteMode) return;
    shapeArray(offsetX, offsetY);
    context.lineTo(offsetX, offsetY);
    context.stroke();
  }

  function startDraw({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) {
    if (isDeleteMode) {
      deleteItem(offsetX, offsetY);
      return;
    }

    setStartLocation({ x: offsetX, y: offsetY });
    setUserDrawing(true);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  }

  function finishDraw() {
    if (isDeleteMode) return;
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
