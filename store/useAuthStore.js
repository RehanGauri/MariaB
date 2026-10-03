import { create } from "zustand";
import { supabase } from "../lib/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  // App load hote hi current session check karta hai (agar user pehle se logged in hai)
  initAuth: async () => {
    const { data } = await supabase.auth.getSession();
    set({ user: data.session?.user ?? null, loading: false });

    // Jab bhi login/logout ho (kisi bhi tab mein), state automatically sync ho jaati hai
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },

  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }, // extra profile info
      },
    });
    if (error) throw error;
    set({ user: data.user });
    return data;
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ user: data.user });
    return data;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));