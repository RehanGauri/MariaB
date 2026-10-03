"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import { useWishlistStore } from "../../../store/useWishlistStore";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(product.id)
  );

  const toggleItem = useWishlistStore((state) => state.toggleItem);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleItem(product);

    toast.success(
      isInWishlist
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block w-full min-w-0"
    >
      {/* IMAGE */}
      <div
        className="
          relative
          w-full
          aspect-2/3
          overflow-hidden
          rounded-xl
          bg-zinc-100
        "
      >
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="
            object-cover
            md:group-hover:scale-105
            transition-transform
            duration-500
          "
          sizes="
            (max-width: 640px) 50vw,
            (max-width: 768px) 50vw,
            (max-width: 1024px) 33vw,
            25vw
          "
        />

        {/* SOLD OUT / NEW */}
        {!product.inStock ? (
          <span
            className="
              absolute
              top-2 left-2
              md:top-3 md:left-3
              bg-zinc-500
              text-white
              text-[9px] md:text-[10px]
              font-semibold
              tracking-wider
              px-2 py-1
              rounded
            "
          >
            SOLD OUT
          </span>
        ) : (
          product.isNew && (
            <span
              className="
                absolute
                top-2 left-2
                md:top-3 md:left-3
                bg-black
                text-white
                text-[9px] md:text-[10px]
                font-semibold
                tracking-wider
                px-2 py-1
                rounded
              "
            >
              NEW
            </span>
          )
        )}

        {/* WISHLIST */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label="Toggle wishlist"
          className="
            absolute
            top-2 right-2
            md:top-3 md:right-3
            z-10
            flex items-center justify-center
            w-8 h-8
            md:w-9 md:h-9
            bg-white/85
            backdrop-blur-sm
            rounded-full
            cursor-pointer
            transition
            hover:bg-white
          "
        >
          {isInWishlist ? (
            <FaHeart className="text-sm md:text-base text-red-500" />
          ) : (
            <FaRegHeart className="text-sm md:text-base text-zinc-700" />
          )}
        </button>

        {/* DESKTOP VIEW DETAILS */}
        <div
          className="
            hidden md:flex
            absolute
            bottom-2
            left-2 right-2
            bg-white
            py-3
            px-3
            items-center
            justify-center
            gap-1
            text-sm
            rounded-xl
            translate-y-full
            opacity-0
            group-hover:translate-y-0
            group-hover:opacity-100
            transition-all
            duration-300
            ease-out
          "
        >
          View Details
          <MdArrowRightAlt className="text-lg" />
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="mt-2 md:mt-3">
        <h3
          className="
            text-xs
            sm:text-sm
            font-medium
            leading-snug
            line-clamp-2
          "
        >
          {product.name}
        </h3>

        <p
          className="
            text-[11px]
            sm:text-xs
            md:text-sm
            text-gray-600
            mt-1
          "
        >
          Regular price US ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;