"use client";

import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const CartPageItem = ({
  item,
  updateQuantity,
}) => {
  const decrease = () => {
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
  };

  const increase = () => {
    updateQuantity(
      item.id,
      item.selectedSize,
      item.selectedColor,
      item.quantity + 1
    );

    toast(`${item.name} quantity increased`, {
      icon: "+",
    });
  };

  return (
    <div className="flex gap-4 sm:gap-6 py-6">
      {/* Image */}
      <div
        className="
          relative
          w-24
          h-32
          sm:w-32
          sm:h-40
          shrink-0
        "
      >
        <Image
          src={item.img}
          fill
          alt={item.name}
          className="object-cover rounded-xl"
          sizes="128px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col">
        <p className="text-[10px] text-gray-400">
          {item.barcode}
        </p>

        <h3 className="text-sm sm:text-base font-medium mt-1">
          {item.name}
        </h3>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-[10px] bg-zinc-100 rounded-md px-2 py-1">
            SIZE: {item.selectedSize}
          </span>

          <span className="text-[10px] bg-zinc-100 rounded-md px-2 py-1">
            COLOR: {item.selectedColor}
          </span>
        </div>

        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
          {/* Quantity */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={decrease}
              className="
                w-8
                h-8
                flex
                items-center
                justify-center
                bg-black
                text-white
                rounded-md
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
              onClick={increase}
              className="
                w-8
                h-8
                flex
                items-center
                justify-center
                bg-black
                text-white
                rounded-md
                cursor-pointer
              "
            >
              <FaPlus className="text-[9px]" />
            </button>
          </div>

          {/* Price */}
          <span className="text-sm font-semibold">
            US ${item.price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartPageItem;