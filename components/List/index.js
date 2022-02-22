import styles from './List.module.css';

function List({ setIsDeleteMode, deleteById, scale, setScale, listOfShapes, setListOfShapes }) {
  return (
    <div className={styles.listContainer}>
      <ul>
        <h1>Items</h1>
        {listOfShapes.map((item, index) => (
          <li key={index}>
            Polygon: {index + 1} <button onClick={deleteById.bind({}, index)}>DELETE</button>
          </li>
        ))}
      </ul>
      <div>
        <div className={styles.deleteContainer}>
          <input type='checkbox' id='toggle' onChange={(e) => setIsDeleteMode(e.target.checked)} />
          <label htmlFor='toggle'>Delete Mode</label>
        </div>
        <div className={styles.zoomContainer}>
          <h2>Zoom</h2>
          <button onClick={() => setScale(scale + 1)}>Increase </button>
          <button onClick={() => setScale(scale - 1)}>Decrease </button>
          Scale: {scale}
        </div>
      </div>
    </div>
  );
}

export default List;
