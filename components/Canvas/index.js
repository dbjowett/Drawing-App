import { useEffect, useRef, useState } from 'react';
import styles from './Canvas.module.css';
import { shapeArray, storeShapes } from '../../utils/storeShapes';

function Canvas({ isDeleteMode, scale, deleteById, listOfShapes, setListOfShapes }) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [startLocation, setStartLocation] = useState({});
  const [userDrawing, setUserDrawing] = useState(false);

  function deleteItem(x, y) {
    listOfShapes.forEach((shape, id) => {
      shape.forEach((coord) => {
        if ((Math.round(coord.x) === Math.round(x) - 10) & (Math.round(coord.y) === Math.round(y) - 10)) {
          deleteById(id);
        }
      });
    });
  }

  // CAN I CHANGE THIS?????/????
  useEffect(() => {
    if (!context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.scale(`1.0${scale}`, `1.0${scale}`);

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
    context.strokeStyle = 'black';
    context.lineWidth = 3;
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

  function finishDraw() {
    if (isDeleteMode) return;
    context.lineTo(startLocation.clientX, startLocation.clientY);
    context.stroke();
    context.closePath();
    setUserDrawing(false);
    const arrlist = storeShapes();
    setListOfShapes((prev) => [...(prev, arrlist)]);
  }

  function draw({ nativeEvent: { clientX, clientY } }) {
    if (!userDrawing || isDeleteMode) return;
    const offSetX = clientX * 0.97;
    const offSetY = clientY * 0.8;
    shapeArray(offSetX, offSetY);
    context.lineTo(offSetX, offSetY);
    context.stroke();
  }

  return <canvas className={styles.canvas} ref={canvasRef} onMouseMove={draw} onMouseDown={startDraw} onMouseUp={finishDraw} />;
}

export default Canvas;
