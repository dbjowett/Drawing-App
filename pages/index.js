import { useState } from 'react';
import Canvas from '../components/Canvas';
import List from '../components/List';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [listOfShapes, setListOfShapes] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState();
  const [scale, setScale] = useState(0);

  const deleteById = (index) => {
    const newArray = [];
    listOfShapes.map((shape, i) => {
      if (i === index) {
        return;
      } else {
        newArray.push(shape);
      }
    });
    setListOfShapes(newArray);
  };

  return (
    <div className={styles.container}>
      <Canvas
        isDeleteMode={isDeleteMode}
        deleteById={deleteById}
        scale={scale}
        setListOfShapes={setListOfShapes}
        listOfShapes={listOfShapes}
      />

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
