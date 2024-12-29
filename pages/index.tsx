import { useState } from 'react';
import styles from '../styles/Home.module.css';

import Canvas from '../components/Canvas';
import List from '../components/List';

export default function Home() {
  const [listOfShapes, setListOfShapes] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [scale, setScale] = useState(1);

  const deleteById = (index: number) => {
    const filteredList = listOfShapes.filter((item, ind) => item[ind] !== item[index]);
    setListOfShapes(filteredList);
  };

  return (
    <div className={styles.container}>
      <Canvas isDeleteMode={isDeleteMode} deleteById={deleteById} scale={scale} setListOfShapes={setListOfShapes} listOfShapes={listOfShapes} />
      <List
        isDeleteMode={isDeleteMode}
        setIsDeleteMode={setIsDeleteMode}
        deleteById={deleteById}
        scale={scale}
        setScale={setScale}
        setListOfShapes={setListOfShapes}
        listOfShapes={listOfShapes}
      />
    </div>
  );
}
