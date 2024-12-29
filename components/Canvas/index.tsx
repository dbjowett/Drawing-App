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

  const deleteById = (index: number) =>
    useShapeStore.setState({
      shapes: listOfShapes.filter((_, ind) => ind !== index),
    });

  const { getTempShapes, addTempShape } = useTempShapes();

  function deleteItem(x: number, y: number) {
    if (!isDeleteMode) return;
    const DISTANCE_THRESHOLD = 15;

    listOfShapes.forEach((shape, idx) => {
      shape.forEach((coord) => {
        const distance = Math.sqrt(Math.pow(coord.x - x, 2) + Math.pow(coord.y - y, 2));

        if (distance < DISTANCE_THRESHOLD) {
          deleteById(idx);
        }
      });
    });
  }

  const redrawShapes = () => {
    if (!context) return;
    listOfShapes?.forEach((shape) => {
      if (shape.length < 2) return;

      context.beginPath();
      context.moveTo(shape[0].x, shape[0].y);

      for (let i = 1; i < shape.length; i++) {
        context.lineTo(shape[i].x, shape[i].y);
      }

      context.lineTo(shape[0].x, shape[0].y);
      context.stroke();
    });
  };

  useEffect(() => {
    if (!context || !canvasRef.current) return;
    const skew = Number(`-${(scale - 1) * 400}`);

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.setTransform(scale, 0, 0, scale, skew, skew);

    redrawShapes();
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

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth * 0.75;
      canvasRef.current.height = window.innerHeight - 30;
      if (context) {
        context.lineCap = 'round';
        context.strokeStyle = '#1d1c2b';
        context.lineWidth = 5;
        context.imageSmoothingQuality = 'high';

        const skew = Number(`-${(scale - 1) * 400}`);
        context.setTransform(scale, 0, 0, scale, skew, skew);

        redrawShapes();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [context, scale, listOfShapes]);

  function draw({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) {
    if (!userDrawing || isDeleteMode) return;
    addTempShape({ x: offsetX, y: offsetY });
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
    const arrlist = getTempShapes();
    addShapes(arrlist);
  }

  return <canvas className={styles.canvas} ref={canvasRef} onMouseMove={draw} onMouseDown={startDraw} onMouseUp={finishDraw} />;
}

export default Canvas;
