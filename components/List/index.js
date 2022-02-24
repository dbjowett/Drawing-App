import styles from './List.module.css';
import { FaSearchPlus, FaSearchMinus, FaTrashAlt, FaGithub, FaSquare, FaUndo, FaPen, FaEraser } from 'react-icons/fa';

function List({ isDeleteMode, setIsDeleteMode, deleteById, scale, setScale, listOfShapes, setListOfShapes }) {
  let currentScale;
  scale >= 10 ? (currentScale = `1.${scale}`) : (currentScale = `1.0${scale}`);

  const resetZoom = () => setScale(0);
  const clearCanvas = () => setListOfShapes([]);

  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.listContainer}>
        <h2 className={styles.shapeHeader}>Shapes</h2>
        {listOfShapes.length === 0 && (
          <div className={styles.standInText}>
            <FaSquare fontSize={6} /> Items will show here
          </div>
        )}
        {listOfShapes.map((item, index) => (
          <li key={index}>
            <FaSquare fontSize={6} /> Polygon {index + 1}
            <button className={styles.deleteBtn} onClick={deleteById.bind({}, index)}>
              <span className={styles.toolTip}>Delete</span>
              <FaTrashAlt fontSize={12} />
            </button>
          </li>
        ))}
        {listOfShapes.length > 1 && (
          <button className={styles.clearCanvasBtn} onClick={clearCanvas}>
            Clear Canvas
          </button>
        )}
      </ul>
      <div>
        <div className={styles.deleteContainer}>
          <label htmlFor='toggle' className={styles.toggle}>
            <span>{isDeleteMode ? <FaEraser fontSize={20} /> : <FaPen fontSize={20} />}</span>
            <h2>{isDeleteMode ? 'Delete ' : 'Draw '}Mode</h2>
            <input type='checkbox' id='toggle' value={isDeleteMode} onChange={(e) => setIsDeleteMode(e.target.checked)} />
            <div className={styles.slider}></div>
          </label>
        </div>
        <div className={styles.zoomContainer}>
          <h2>Zoom</h2>
          <button onClick={() => setScale(scale + 1)}>
            Increase <FaSearchPlus fontSize={15} />
          </button>
          <button onClick={() => setScale(Math.max(0, scale - 1))}>
            Decrease <FaSearchMinus fontSize={15} />
          </button>
          Scale {currentScale}
          <button className={styles.resetScaleBtn} onClick={resetZoom}>
            Reset <FaUndo fontSize={9} />
          </button>
        </div>
        <div className={styles.me}>
          <a href='https://www.github.com/dbjowett' rel='noreferrer' target='_blank'>
            Daniel Jowett
            <FaGithub fontSize={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default List;
