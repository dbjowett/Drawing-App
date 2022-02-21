import styles from './List.module.css';

function List({ setIsDeleteMode, scale, setScale }) {
  return (
    <div className={styles.listContainer}>
      <ul>
        <li>Polygon 1</li>
        <li>Polygon 2</li>
        <li>Polygon 3</li>
      </ul>
      <div className={styles.deleteContainer}>
        <input type='checkbox' id='toggle' onClick={(e) => setIsDeleteMode(e.target.checked)} />
        <label htmlFor='toggle'>Delete Mode</label>
        <div>
          <button onClick={() => setScale(scale + 1)}>Increase </button>
          <button onClick={() => setScale(scale - 1)}>Decrease </button>
          {scale}
        </div>
      </div>
    </div>
  );
}

export default List;
