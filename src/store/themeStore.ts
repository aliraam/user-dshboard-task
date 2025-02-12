import { create } from "zustand";

interface ThemeState {
    darkMode: boolean;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    darkMode: true,
    toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}));
