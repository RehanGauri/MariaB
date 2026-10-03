"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "@/components/ui/Button";

import { useCartStore } from "../../../store/useCartStore";

import toast from "react-hot-toast";

const ProductDetail = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);


  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    toast.success(`${product.name} added to cart`)
  };
  

  const decreaseQty = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const increaseQty = () => {
    setQuantity((q) => q + 1);
  };

  return (
    <div className="max-w-7xl m-auto  w-full px-4 sm:px-6 lg:px-10 pt-24 md:pt-28 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20">
        {/* Product Image */}
        <div
          className="
            relative
            w-full
            min-w-0
            h-[460px]
            sm:h-[560px]
            md:h-[650px]
            lg:h-[720px]
            lg:sticky
            lg:top-28
            lg:self-start
            overflow-hidden
            rounded-xl
            bg-zinc-100
          "
        >
          <Image
            src={product.img}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6 lg:gap-7 min-w-0">
          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
              {product.name}
            </h1>

            <p
              className={`text-sm mt-2 font-medium ${
                product.inStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.inStock ? "In Stock" : "Sold Out"}
            </p>

            <p className="text-xs text-gray-400 mt-1 break-all">
              BARCODE: {product.barcode}
            </p>
          </div>

          {/* Price */}
          <div>
            <span className="text-sm text-gray-500">Price</span>

            <p className="text-xl sm:text-2xl font-semibold mt-1">
              Regular price US ${product.price}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Shipping calculated at checkout.
            </p>
          </div>

          {/* Shipping */}
          <div>
            <span className="text-sm text-gray-500">Shipping Time</span>

            <p className="text-sm font-medium mt-1">{product.shippingTime}</p>
          </div>

          {/* Color */}
          <div>
            <span className="text-sm text-gray-500">Color</span>

            <div className="flex flex-wrap gap-2 mt-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`
                    px-4 py-2.5
                    text-xs
                    rounded-lg
                    border
                    transition
                    cursor-pointer
                    ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-zinc-300 bg-white text-black hover:border-black"
                    }
                  `}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <span className="text-sm text-gray-500">Size</span>

            <div className="flex flex-wrap gap-2 mt-3">
              {product.sizes.map((size) => (
                <button
                  key={size.label}
                  type="button"
                  disabled={!size.available}
                  onClick={() => setSelectedSize(size.label)}
                  className={`
                    min-w-12
                    px-4 py-2.5
                    text-xs
                    rounded-lg
                    border
                    transition
                    ${
                      !size.available
                        ? "border-zinc-200 text-zinc-300 cursor-not-allowed line-through"
                        : selectedSize === size.label
                          ? "border-black bg-black text-white cursor-pointer"
                          : "border-zinc-300 bg-white text-black hover:border-black cursor-pointer"
                    }
                  `}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <span className="text-sm text-gray-500">Quantity</span>

            <div className="flex items-center mt-3 w-fit border border-zinc-300 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={decreaseQty}
                aria-label="Decrease quantity"
                className="
                  w-11 h-11
                  flex items-center justify-center
                  bg-black text-white
                  hover:bg-zinc-800
                  transition
                  cursor-pointer
                "
              >
                <FaMinus className="text-[10px]" />
              </button>

              <span className="w-12 text-center text-sm font-medium">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQty}
                aria-label="Increase quantity"
                className="
                  w-11 h-11
                  flex items-center justify-center
                  bg-black text-white
                  hover:bg-zinc-800
                  transition
                  cursor-pointer
                "
              >
                <FaPlus className="text-[10px]" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            text={product.inStock ? "ADD TO CART" : "SOLD OUT"}
            onClick={handleAddToCart}
            classNames="
              justify-center
              w-full
              py-3.5
              text-sm
              tracking-wide
              bg-black
              text-white
              rounded-lg
            "
            styles={
              !product.inStock
                ? {
                    pointerEvents: "none",
                    opacity: 0.5,
                  }
                : {}
            }
          />

          {/* Product Care */}
          <div className="border-t border-zinc-200 pt-6 mt-1">
            <h3 className="font-semibold tracking-wide mb-5">Product Care</h3>

            <div className="mb-5">
              <span className="text-sm text-gray-500">Fabric</span>

              <p className="text-sm mt-1">{product.fabric}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Care</span>

              <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                {product.care.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
