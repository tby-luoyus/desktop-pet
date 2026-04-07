import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PetMood = 'idle' | 'happy' | 'sad' | 'curious' | 'sleeping';

interface Position {
  x: number;
  y: number;
}

interface PetState {
  // 状态
  position: Position;
  currentMood: PetMood;
  isSleeping: boolean;
  name: string;
  level: number;
  experience: number;

  // Actions
  setPosition: (position: Position) => void;
  setMood: (mood: PetMood) => void;
  setSleeping: (sleeping: boolean) => void;
  addExperience: (exp: number) => void;
  resetPet: () => void;
}

const initialState = {
  position: { x: 100, y: 100 },
  currentMood: 'idle' as PetMood,
  isSleeping: false,
  name: '小毛球',
  level: 1,
  experience: 0,
};

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      ...initialState,

      setPosition: (position) => set({ position }),

      setMood: (currentMood) => set({ currentMood }),

      setSleeping: (isSleeping) =>
        set({
          isSleeping,
          currentMood: isSleeping ? 'sleeping' : 'idle',
        }),

      addExperience: (exp) =>
        set((state) => {
          const newExperience = state.experience + exp;
          const expForNextLevel = state.level * 100;

          if (newExperience >= expForNextLevel) {
            return {
              experience: newExperience - expForNextLevel,
              level: state.level + 1,
            };
          }

          return { experience: newExperience };
        }),

      resetPet: () => set(initialState),
    }),
    {
      name: 'desktop-pet-storage',
      partialize: (state) => ({
        position: state.position,
        name: state.name,
        level: state.level,
        experience: state.experience,
      }),
    }
  )
);
