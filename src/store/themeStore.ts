import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "../types";

export const useThemeStore = create<Theme>()(
    persist(
        (set) => ({
            darkMode: false,
            toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
        }),
        {
            name: "theme-storage",
        }
    )
);
