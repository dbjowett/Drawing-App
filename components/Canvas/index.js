import { useEffect, useRef, useState } from 'react';

function Canvas({ isDelete, scale }) {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [startLocation, setStartLocation] = useState({});
  const [userDrawing, setUserDrawing] = useState(false);

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
    setStartLocation({ clientX, clientY });
    setUserDrawing(true);
    context.beginPath();
    context.moveTo(clientX, clientY);
  }

  function finishDraw(e) {
    context.lineTo(startLocation.clientX, startLocation.clientY);
    context.stroke();
    setUserDrawing(false);
    context.closePath();
  }

  function draw({ nativeEvent: { clientX, clientY } }) {
    if (!userDrawing) {
      return;
    }
    context.lineTo(clientX, clientY);
    context.stroke();
  }

  useEffect(() => {
    context?.scale(1, 1);
    console.log(context);
  }, [context, scale]);

  return <canvas ref={canvasRef} onMouseMove={draw} onMouseDown={startDraw} onMouseUp={finishDraw} />;
}

export default Canvas;
