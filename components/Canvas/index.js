import { useEffect, useRef, useState } from 'react';
import styles from './Canvas.module.css';
import { shapeArray, storeShapes } from '../../utils/storeShapes';

function Canvas({ isDelete, scale, listOfShapes, setListOfShapes }) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [startLocation, setStartLocation] = useState({});
  const [userDrawing, setUserDrawing] = useState(false);

  function deleteItem(x, y) {
    console.log(x, y);
  }

  useEffect(() => {
    if (!context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    listOfShapes.forEach((shape) => {
      context.beginPath();
      shape.forEach((coord) => {
        context.lineTo(coord.x, coord.y);
      });
      context.closePath();
      context.stroke();
    });
  }, [listOfShapes, context]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.imageSmoothingQuality = 'high';
    setContext(context);
  }, []);

  function startDraw({ nativeEvent: { clientX, clientY } }) {
    if (isDelete) {
      deleteItem(clientX, clientY);
      return;
    }
    console.log(isDelete);
    setStartLocation({ clientX, clientY });
    setUserDrawing(true);
    context.beginPath();
    context.moveTo(clientX, clientY);
  }

  function finishDraw(e) {
    if (isDelete) return;
    context.lineTo(startLocation.clientX, startLocation.clientY);
    context.stroke();
    context.closePath();
    setUserDrawing(false);
    const arrlist = storeShapes();
    setListOfShapes((prev) => [...(prev, arrlist)]);
  }

  function draw({ nativeEvent: { clientX, clientY } }) {
    if (!userDrawing || isDelete) return;
    shapeArray(clientX, clientY);
    context.lineTo(clientX, clientY);
    context.stroke();
  }

  return <canvas className={styles.canvas} ref={canvasRef} onMouseMove={draw} onMouseDown={startDraw} onMouseUp={finishDraw} />;
}

export default Canvas;
