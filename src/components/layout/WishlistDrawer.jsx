"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/context/WishlistContext";
import { useWishlistStore } from "../../../store/useWishlistStore";
import { useCartStore } from "../../../store/useCartStore";
import toast from "react-hot-toast";

const WishlistItem = ({ item, onRemove, onMoveToCart }) => (
  <div className="h-42 w-full flex items-center">
    <div className="relative h-38 w-30 shrink-0">
      <Image src={item.img} fill alt={item.name} className="rounded-xl object-cover" />
    </div>
    <div className="w-full pl-4 flex flex-col gap-2">
      <div className="relative flex items-start justify-between">
        <div className="flex flex-col">
          <h1 className="text-gray-500 text-sm">{item.barcode}</h1>
          <h1>{item.name}</h1>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          aria-label="Remove from wishlist"
          className="cursor-pointer shrink-0"
        >
          <FaHeart className="text-xl text-red-500 hover:scale-110 transition-transform duration-200" />
        </button>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <button
          onClick={() => onMoveToCart(item)}
          className="text-xs underline cursor-pointer"
        >
          Move to Cart
        </button>
        <span>US ${item.price}</span>
      </div>
    </div>
  </div>
);

const WishlistDrawer = () => {
  const { isWishlistOpen, closeWishlist } = useWishlist();

  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    document.body.style.overflow = isWishlistOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isWishlistOpen]);

  const handleMoveToCart = (item) => {
    // Wishlist card pe size/color select nahi hua hota, isliye default pehla
    // available color/size le lete hain. Chahe to isse product page pe bhej
    // ke wahan selection karwa sakte ho — ye simplest version hai.
    const defaultSize = item.sizes?.find((s) => s.available)?.label || null;
    const defaultColor = item.colors?.[0] || null;

    addToCart(item, defaultSize, defaultColor, 1);
    removeItem(item.id);
    toast.success(`${item.name} moved to cart`);
  };

  const handleRemove = (id) => {
    removeItem(id);
    toast("Removed from wishlist");
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[150]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed flex flex-col top-0 right-0 h-full bg-white w-full md:w-150 z-[200] py-5"
          >
            <div className="pt-8 py-2 flex justify-between border-b border-gray-300 px-10 shrink-0">
              <div>WISHLIST ( {items.length} Items )</div>
              <button className="text-3xl cursor-pointer" onClick={closeWishlist}>
                <IoCloseOutline />
              </button>
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto gap-8 px-10">
              {items.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-10">
                  Your wishlist is empty.
                </p>
              ) : (
                items.map((item) => (
                  <WishlistItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onMoveToCart={handleMoveToCart}
                  />
                ))
              )}
            </div>

            <div className="shrink-0 px-10 pt-4 border-t border-gray-200">
              <button
                onClick={closeWishlist}
                className="w-full text-sm underline text-center py-2"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;