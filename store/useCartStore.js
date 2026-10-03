import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      previousOrders: [],

      addItem: (product, selectedSize, selectedColor, selectedQuantity = 1) => {
        const existing = get().items.find(
          (item) =>
            item.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor,
        );

        if (existing) {
          set({
            items: get().items.map((item) =>
              item === existing
                ? { ...item, quantity: item.quantity + selectedQuantity }
                : item,
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                ...product,
                selectedSize,
                selectedColor,
                quantity: selectedQuantity,
              },
            ],
          });
        }
      },

      removeItem: (id, selectedSize, selectedColor) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.id === id &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
              ),
          ),
        });
      },

      updateQuantity: (id, selectedSize, selectedColor, quantity) => {
        if (quantity < 1) {
          get().removeItem(id, selectedSize, selectedColor);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
              ? { ...item, quantity }
              : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      },

      placeOrder: () => {
        const items = get().items;

        if (items.length === 0) return;

        const order = {
          id: `ORDER-${Date.now()}`,
          date: new Date().toISOString(),
          items: items,
          total: get().getTotalPrice(),
        };

        set({
          previousOrders: [order, ...get().previousOrders],
          items: [],
        });
      },
      clearHistory: ()=>{
        set({
          previousOrders: []
        })
      }
    }),
    {
      name: "cart-storage",
    },
  ),
);
