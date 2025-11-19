import { create } from "zustand";
import API from "../services/api";

export const useUserStore = create((set) => ({
  user: null,

  fetchUser: async () => {
    try {
      const res = await API.get("/auth/me");
      set({ user: res.data });
    } catch (err) {
      console.log("User fetch failed:", err);
      set({ user: null });
    }
  },

  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));
