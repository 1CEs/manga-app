import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../db/db';

interface TokenState {
  token: string | null;
  setToken: (token: string | null) => Promise<void>;
  clearToken: () => Promise<void>;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      setToken: async (token) => {
        if (token) {
          await db.saveAuthToken(token);
        } else {
          await db.clearAll();
        }
        set({ token });
      },
      clearToken: async () => {
        await db.clearAll();
        set({ token: null });
      },
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
