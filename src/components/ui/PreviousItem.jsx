"use client";

import Image from "next/image";
import { IoBagCheckOutline } from "react-icons/io5";

const PreviousItem = ({ order }) => {
  const formattedDate = new Date(
    order.date
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="
        bg-zinc-50
        border
        border-zinc-200
        rounded-xl
        p-4
        sm:p-5
      "
    >
      {/* Order Header */}
      <div className="flex justify-between gap-4 mb-5">
        <div>
          <p className="text-[10px] text-gray-500 tracking-wider uppercase">
            Order
          </p>

          <h2 className="text-sm font-semibold mt-1">
            {order.id}
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            {formattedDate}
          </p>
        </div>

        <div
          className="
            h-fit
            flex
            items-center
            gap-1
            px-2
            py-1
            rounded-full
            bg-green-100
            text-green-700
            text-[10px]
            font-medium
          "
        >
          <IoBagCheckOutline />

          <span>Ordered</span>
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-col gap-4">
        {order.items.map((item, index) => (
          <div
            key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
            className="
              flex
              gap-3
              pb-4
              border-b
              border-zinc-200
              last:border-0
              last:pb-0
            "
          >
            {/* Image */}
            <div
              className="
                relative
                h-24
                w-20
                sm:h-28
                sm:w-24
                shrink-0
              "
            >
              <Image
                src={item.img}
                fill
                alt={item.name}
                className="rounded-lg object-cover"
                sizes="96px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium">
                {item.name}
              </h3>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-white border border-zinc-200 rounded-md text-[10px] px-2 py-1">
                  SIZE: {item.selectedSize}
                </span>

                <span className="bg-white border border-zinc-200 rounded-md text-[10px] px-2 py-1">
                  COLOR: {item.selectedColor}
                </span>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </span>

                <span className="text-sm font-medium">
                  US ${item.price * item.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-300">
        <span className="text-xs font-semibold tracking-wide">
          ORDER TOTAL
        </span>

        <span className="text-sm font-semibold">
          US ${order.total}
        </span>
      </div>
    </div>
  );
};

export default PreviousItem;