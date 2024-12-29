import { useEffect, useRef } from 'react';
import { FaEraser, FaGithub, FaPen, FaSearchMinus, FaSearchPlus, FaSquare, FaTrashAlt, FaUndo } from 'react-icons/fa';
import { useShapeStore } from '../../store';
import styles from './List.module.css';

function List() {
  const scale = useShapeStore((state) => state.scale);

  const listOfShapes = useShapeStore((state) => state.shapes);
  const isDeleteMode = useShapeStore((state) => state.isDeleteMode);

  const setScale = (num: number) => useShapeStore.setState({ scale: num });
  const setIsDeleteMode = (bool: boolean) => useShapeStore.setState({ isDeleteMode: bool });

  const deleteById = (index: number) => useShapeStore.setState({ shapes: listOfShapes.filter((item, ind) => item[ind] !== item[index]) });

  const currentScale = scale.toFixed(2);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const resetZoom = () => setScale(1);
  const clearCanvas = () => useShapeStore.setState({ shapes: [] });

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
  }, [listOfShapes, scrollRef]);

  return (
    <div className={styles.sidebarContainer}>
      <h2 className={styles.shapeHeader}>Shapes</h2>
      <ul className={styles.listContainer}>
        {listOfShapes.length === 0 && (
          <div className={styles.standInText}>
            <FaSquare fontSize={6} /> Items will show here
          </div>
        )}
        {listOfShapes.length > 0 &&
          listOfShapes.map((_, index) => (
            <li key={index}>
              <FaSquare fontSize={6} /> Polygon {index + 1}
              <button className={styles.deleteBtn} onClick={() => deleteById(index)}>
                <span className={styles.toolTip}>Delete</span>
                <FaTrashAlt fontSize={12} />
              </button>
            </li>
          ))}
        <div ref={scrollRef}></div>
      </ul>
      {listOfShapes.length > 1 && (
        <button className={styles.clearCanvasBtn} onClick={clearCanvas}>
          Clear Canvas
        </button>
      )}
      <div className={styles.lowerContainer}>
        <div className={styles.deleteContainer}>
          <label htmlFor="toggle" className={styles.toggle}>
            <span>{isDeleteMode ? <FaEraser fontSize={20} /> : <FaPen fontSize={20} />}</span>
            <h2>{isDeleteMode ? 'Delete ' : 'Draw '}Mode</h2>
            <input type="checkbox" id="toggle" value={isDeleteMode.toString()} onChange={(e) => setIsDeleteMode(e.target.checked)} />
            <div className={styles.slider}></div>
          </label>
        </div>
        <div className={styles.zoomContainer}>
          <h2>Zoom</h2>
          <button onClick={() => setScale(scale + 0.01)}>
            Increase <FaSearchPlus fontSize={15} />
          </button>
          <button onClick={() => setScale(Math.max(1, scale - 0.01))}>
            Decrease <FaSearchMinus fontSize={15} />
          </button>
          Scale {currentScale}
          <button className={styles.resetScaleBtn} onClick={resetZoom}>
            Reset <FaUndo fontSize={9} />
          </button>
        </div>
        <div className={styles.me}>
          <a href="https://www.github.com/dbjowett" rel="noreferrer" target="_blank">
            Daniel Jowett
            <FaGithub fontSize={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default List;
