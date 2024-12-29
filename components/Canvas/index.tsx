import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useTempShapes } from '../../hooks/useTempShapes';
import { useShapeStore } from '../../store';
import { DrawnShape, ShapeCoords } from '../../types';
import styles from './Canvas.module.css';

function Canvas() {
  const scale = useShapeStore((state) => state.scale);
  const isDeleteMode = useShapeStore((state) => state.isDeleteMode);
  const listOfShapes = useShapeStore((state) => state.shapes);
  const addShapes = (arrlist: DrawnShape[]) => {
    useShapeStore.setState((state) => ({
      shapes: [...state.shapes, ...arrlist],
    }));
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startLocation, setStartLocation] = useState<ShapeCoords | null>(null);
  const [userDrawing, setUserDrawing] = useState<boolean>(false);

  const deleteById = (index: number) => useShapeStore.setState({ shapes: listOfShapes.filter((item, ind) => item[ind] !== item[index]) });

  const { getTempShapes, addTempShape } = useTempShapes();

  function deleteItem(x: number, y: number) {
    if (!isDeleteMode) return;
    const DISTANCE_THRESHOLD = 15;

    listOfShapes.forEach((shape, id) => {
      shape.forEach((coord) => {
        const distance = Math.sqrt(Math.pow(coord.x - x, 2) + Math.pow(coord.y - y, 2));

        if (distance < DISTANCE_THRESHOLD) {
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
    addTempShape({ x: offsetX, y: offsetY });
    if (!context) return;

    context.lineTo(offsetX, offsetY);
    context.stroke();
  }

  function startDraw({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) {
    if (isDeleteMode) {
      console.log(`Deleting with offsetX: ${offsetX} and offsetY:  ${offsetY}`);
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
    const arrlist = getTempShapes();
    addShapes(arrlist);
  }

  return <canvas className={styles.canvas} ref={canvasRef} onMouseMove={draw} onMouseDown={startDraw} onMouseUp={finishDraw} />;
}

export default Canvas;
