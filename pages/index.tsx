import { useState } from 'react';
import styles from '../styles/Home.module.css';

import Canvas from '../components/Canvas';
import List from '../components/List';

export interface ShapeCoords {
  x: number;
  y: number;
}

// An array of coordinates that make up a drawing
export type DrawnShape = ShapeCoords[];

export default function Home() {
  const [listOfShapes, setListOfShapes] = useState<DrawnShape[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);

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
