import { useEffect, useState } from 'react';
import Canvas from '../components/Canvas';
import List from '../components/List';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [listOfShapes, setListOfShapes] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState();
  const [scale, setScale] = useState(1);

  function deleteById(index) {
    const array = listOfShapes;
    array.splice(index, 1);
    console.log(array);
    setListOfShapes(array);
  }

  useEffect(() => {
    // console.log(listOfShapes);
  }, [listOfShapes]);

  return (
    <div className={styles.container}>
      <Canvas isDelete={isDeleteMode} deleteById={deleteById} scale={scale} setListOfShapes={setListOfShapes} listOfShapes={listOfShapes} />
      <List
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
