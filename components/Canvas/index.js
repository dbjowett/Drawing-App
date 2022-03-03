import { useEffect, useRef, useState } from 'react';
import styles from './Canvas.module.css';
import { shapeArray, storeShapes } from '../../utils/storeShapes';

function Canvas({ isDeleteMode, scale, deleteById, listOfShapes, setListOfShapes }) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [startLocation, setStartLocation] = useState({});
  const [userDrawing, setUserDrawing] = useState(false);

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
    const skew = `-${(scale - 1) * 400}`;

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

  function draw({ nativeEvent: { offsetX, offsetY } }) {
    if (!userDrawing || isDeleteMode) return;
    shapeArray(offsetX, offsetY);
    context.lineTo(offsetX, offsetY);
    context.stroke();
  }

  function startDraw({ nativeEvent: { offsetX, offsetY } }) {
    if (isDeleteMode) {
      deleteItem(offsetX, offsetY);
      return;
    }

    setStartLocation(offsetX, offsetY);
    setUserDrawing(true);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  }

  function finishDraw() {
    if (isDeleteMode) return;
    context.lineTo(startLocation.clientX, startLocation.clientY);
    context.stroke();
    context.closePath();
    setUserDrawing(false);
    const arrlist = storeShapes();
    setListOfShapes((prev) => {
      const newArray = prev.concat(arrlist);
      return newArray;
    });
  }

  return <canvas className={styles.canvas} ref={canvasRef} onMouseMove={draw} onMouseDown={startDraw} onMouseUp={finishDraw} />;
}

export default Canvas;
