import { create } from 'zustand';
import { DrawnShape } from '../types';

interface State {
  scale: number;
  isDeleteMode: boolean;
  shapes: DrawnShape[];
}

export const useShapeStore = create<State>((set) => ({
  scale: 1,
  isDeleteMode: false,
  shapes: [],
}));
