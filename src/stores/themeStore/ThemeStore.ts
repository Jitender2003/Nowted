import { create } from "zustand";

type themeStore = {
  theme: string;
  setTheme: (newTheme: string) => void;
};

export const useThemeStore = create<themeStore>((set) => ({
  theme: localStorage.getItem("appTheme") || "default",
  setTheme: (newTheme: string) => {
    set({ theme: newTheme });
  },
}));
