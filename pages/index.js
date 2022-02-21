import { useEffect, useState } from 'react';
import Canvas from '../components/Canvas';
import List from '../components/List';
import styles from '../styles/Home.module.css';

export default function Home() {
  // const [listItems, setListItems] = useState({});

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [scale, setScale] = useState(1);

  // useEffect(() => {
  //   console.log(scale);
  // }, [scale]);

  return (
    <div className={styles.container}>
      <Canvas isDelete={isDeleteMode} scale={scale} />
      <List setIsDeleteMode={setIsDeleteMode} scale={scale} setScale={setScale} />
    </div>
  );
}
