import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "light",

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";

      // Apply to HTML root so CSS can react
      document.documentElement.setAttribute("data-theme", newTheme);

      return { theme: newTheme };
    }),
}));

export const useUserStore = create((set) => ({
  user: null,

  setUser: (userData) => set({ user: userData }),

  logout: () => set({ user: null }),
}));
