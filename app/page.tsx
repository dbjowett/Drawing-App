// app/page.tsx
'use client';

import { useState } from 'react';
import Canvas from '../components/Canvas';
import List from '../components/List';

export interface ShapeCoords {
  x: number;
  y: number;
}

export type DrawnShape = ShapeCoords[];

export default function Home() {
  const [listOfShapes, setListOfShapes] = useState<DrawnShape[]>([]);

  const deleteById = (index: number) => {
    const filteredList = listOfShapes.filter((item, ind) => item[ind] !== item[index]);
    setListOfShapes(filteredList);
  };

  return (
    <main className="container">
      <Canvas deleteById={deleteById} setListOfShapes={setListOfShapes} listOfShapes={listOfShapes} />
      <List deleteById={deleteById} setListOfShapes={setListOfShapes} listOfShapes={listOfShapes} />
    </main>
  );
}
