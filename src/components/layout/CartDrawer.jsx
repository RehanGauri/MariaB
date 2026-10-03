"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

import Button from "../ui/Button";
import { useCart } from "@/context/CartContext";
import { useCartStore } from "../../../store/useCartStore";
import toast from "react-hot-toast";

const CartItem = ({ item, updateQuantity }) => {
  return (
    <div className="w-full flex gap-4 py-2">
      {/* Image */}
      <div className="relative h-36 w-28 shrink-0">
        <Image
          src={item.img}
          fill
          alt={item.name}
          className="rounded-xl object-cover"
          sizes="112px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <p className="text-gray-400 text-xs">
          {item.barcode}
        </p>

        <h1 className="text-sm font-medium truncate">
          {item.name}
        </h1>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            SIZE
          </span>

          <span className="bg-zinc-800/10 rounded-lg text-xs px-2 py-1">
            {item.selectedSize}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            COLOR
          </span>

          <span className="bg-zinc-800/10 rounded-lg text-xs px-2 py-1">
            {item.selectedColor}
          </span>
        </div>

        {/* Quantity + Price */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                updateQuantity(
                  item.id,
                  item.selectedSize,
                  item.selectedColor,
                  item.quantity - 1
                );

                if (item.quantity === 1) {
                  toast(`${item.name} removed from cart`, {
                    icon: "✓",
                  });
                } else {
                  toast(`${item.name} quantity decreased`, {
                    icon: "−",
                  });
                }
              }}
              className="
                w-7 h-7
                flex items-center justify-center
                bg-black text-white
                rounded
                cursor-pointer
              "
            >
              <FaMinus className="text-[9px]" />
            </button>

            <span className="text-sm w-5 text-center">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => {
                updateQuantity(
                  item.id,
                  item.selectedSize,
                  item.selectedColor,
                  item.quantity + 1
                );

                toast(`${item.name} quantity increased`, {
                  icon: "+",
                });
              }}
              className="
                w-7 h-7
                flex items-center justify-center
                bg-black text-white
                rounded
                cursor-pointer
              "
            >
              <FaPlus className="text-[9px]" />
            </button>
          </div>

          <span className="text-sm font-medium">
            US ${item.price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = () => {
  const items = useCartStore(
    (state) => state.items
  );

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const totalPrice = useCartStore(
    (state) => state.getTotalPrice()
  );

  const { isCartOpen, closeCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = isCartOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="
              fixed inset-0
              bg-black/30
              backdrop-blur-sm
              z-[150]
            "
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="
              fixed
              top-0 right-0
              h-full
              bg-white
              w-full
              sm:w-[480px]
              md:w-[560px]
              z-[200]
              flex flex-col
              py-5
            "
          >
            {/* Header */}
            <div
              className="
                pt-6
                pb-4
                px-5
                sm:px-8
                flex
                justify-between
                items-center
                border-b
                border-gray-200
                shrink-0
              "
            >
              <div>
                <h2 className="text-sm font-semibold tracking-wide">
                  SHOPPING BAG
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  {items.length}{" "}
                  {items.length === 1
                    ? "item"
                    : "items"}
                </p>
              </div>

              <button
                type="button"
                className="
                  text-3xl
                  cursor-pointer
                  hover:rotate-90
                  transition
                "
                onClick={closeCart}
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Cart Items */}
            <div
              className="
                flex-1
                overflow-y-auto
                px-5
                sm:px-8
                py-5
              "
            >
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-4">
                    🛒
                  </div>

                  <h2 className="text-lg font-semibold">
                    Your cart is empty
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Add something you love to your cart.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      item={item}
                      updateQuantity={updateQuantity}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom */}
            <div
              className="
                shrink-0
                px-5
                sm:px-8
                pt-4
                border-t
                border-gray-200
              "
            >
              {/* History */}
              <Link
                href="/cart"
                onClick={closeCart}
                className="
                  flex
                  items-center
                  justify-between
                  py-3
                  mb-4
                  text-sm
                  font-medium
                  border-b
                  border-gray-200
                  hover:opacity-60
                  transition
                "
              >
                <span>
                  View Cart & Order History
                </span>

                <FiArrowRight />
              </Link>

              {/* Subtotal */}
              <div className="flex justify-between mb-3">
                <span className="font-semibold">
                  SUBTOTAL
                </span>

                <span className="font-semibold">
                  US ${totalPrice}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                Taxes, discounts and shipping
                calculated at checkout.
              </p>

              <Link href={"/cart"} onClick={closeCart}>
              <Button
                text="CHECKOUT"
                classNames="
                  w-full
                  justify-center
                  py-3
                "
              />
              </Link>
              
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;