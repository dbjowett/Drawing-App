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
          <label htmlFor='toggle'>
            <h2>Delete Mode</h2>
          </label>
          <input type='checkbox' id='toggle' value={isDeleteMode} onChange={(e) => setIsDeleteMode(e.target.checked)} />
        </div>
        <div className={styles.zoomContainer}>
          <h2>Zoom</h2>
          <button onClick={() => setScale(scale + 1)}>Increase </button>
          <button onClick={() => setScale(Math.max(0, -1))}>Decrease </button>
          Scale: {scale}
        </div>
      </div>
    </div>
  );
}

export default List;
