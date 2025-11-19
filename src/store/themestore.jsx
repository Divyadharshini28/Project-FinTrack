import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  token: null,

  setUser: (userData, jwtToken) => set({ user: userData, token: jwtToken }),

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
