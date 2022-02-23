import styles from './List.module.css';

function List({ isDeleteMode, setIsDeleteMode, deleteById, scale, setScale, listOfShapes, setListOfShapes }) {
  return (
    <div className={styles.listContainer}>
      <ul>
        <h1>Shapes</h1>
        {listOfShapes.map((item, index) => (
          <li key={index}>
            Polygon {index + 1}
            <button className={styles.deleteBtn} onClick={deleteById.bind({}, index)}>
              Delete Item
            </button>
          </li>
        ))}
      </ul>
      <div>
        <div className={styles.deleteContainer}>
          <label htmlFor='toggle' className={styles.toggle}>
            <h2>{isDeleteMode ? 'Delete ' : 'Draw '}Mode</h2>
            <input type='checkbox' id='toggle' value={isDeleteMode} onChange={(e) => setIsDeleteMode(e.target.checked)} />
            <div className={styles.slider}></div>
          </label>
        </div>
        <div className={styles.zoomContainer}>
          <h2>Zoom</h2>
          <button onClick={() => setScale(scale + 1)}>Increase </button>
          <button onClick={() => setScale(Math.max(0, scale - 1))}>Decrease </button>
          Scale: {scale}
        </div>
      </div>
    </div>
  );
}

export default List;
