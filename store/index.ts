import { create } from 'zustand';

interface State {
  scale: number;
  isDeleteMode: boolean;
}

export const useShapeStore = create<State>((set) => ({
  scale: 1,
  isDeleteMode: false,
}));
