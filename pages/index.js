import Canvas from '../components/Canvas';
import List from '../components/List';
import styles from '../styles/Home.module.css';

export default function Home() {
  function draw() {}

  return (
    <div className={styles.container}>
      <Canvas />
      <List />
    </div>
  );
}
