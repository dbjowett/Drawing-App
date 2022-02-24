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
        if (Math.abs(coord.x - x) < 15 && Math.abs(coord.y - y) < 15 && Math.abs(coord.x - x) + Math.abs(coord.y - y) < 160) {
          deleteById(id);
        }
      });
    });
  }

  useEffect(() => {
    if (!context) return;
    let zoom;
    scale >= 10 ? (zoom = `1.${scale}`) : (zoom = `1.0${scale}`);
    const skew = `-${scale}0` * 0.4;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.setTransform(zoom, 0, 0, zoom, skew, skew);

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
    canvas.height = window.innerHeight * 0.8;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = '#1d1c2b';
    context.lineWidth = 5;
    context.imageSmoothingQuality = 'high';
    setContext(context);
  }, []);

  function startDraw({ nativeEvent: { clientX, clientY } }) {
    const offSetX = clientX * 0.97;
    const offSetY = clientY * 0.8;
    if (isDeleteMode) {
      deleteItem(offSetX, offSetY);
      return;
    }
    setStartLocation(offSetX, offSetY);
    setUserDrawing(true);
    context.beginPath();
    context.moveTo(offSetX, offSetY);
  }

  function draw({ nativeEvent: { clientX, clientY } }) {
    if (!userDrawing || isDeleteMode) return;
    const offSetX = clientX * 0.97;
    const offSetY = clientY * 0.8;
    shapeArray(offSetX, offSetY);
    context.lineTo(offSetX, offSetY);
    context.stroke();
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
