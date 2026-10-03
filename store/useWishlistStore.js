import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // product ka poora object store karte hain (size/color yaha nahi chunte,
      // wo sirf cart mein jaate waqt chunte hain — wishlist sirf "pasand hai" batata hai)
      toggleItem: (product) => {
        const exists = get().items.find((item) => item.id === product.id);

        if (exists) {
          set({ items: get().items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    }
  )
);