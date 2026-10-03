"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiHeart, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";

import { useCart } from "@/context/CartContext";
import { useCartStore } from "../../../store/useCartStore";
import { useWishlist } from "@/context/WishlistContext";
import { useAccount } from "@/context/AccountContext";
import { useSearch } from "@/context/SearchContext";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  const totalItems = useCartStore((state) => state.getTotalItems());

  const { toggleWishlist } = useWishlist();
  const { toggleCart } = useCart();
  const { openAccount } = useAccount();

  const { openSearch } = useSearch();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white sticky top-0 left-0 w-full flex items-center justify-between px-3 sm:px-6 py-5 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* MENU */}
        <button
          type="button"
          aria-label="Open menu"
          className="text-2xl cursor-pointer hover:scale-110 transition"
        >
          <RiMenu2Fill />
        </button>

        {/* SEARCH */}
        <button
          onClick={openSearch}
          className="text-2xl cursor-pointer hover:scale-110 transition"
        >
          <FiSearch />
        </button>
      </div>

      {/* LOGO */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-xl sm:text-2xl tracking-wide">MARIA.B.</h1>
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* WISHLIST */}
        <button
          type="button"
          aria-label="Wishlist"
          className="text-2xl cursor-pointer hover:scale-110 transition"
          onClick={toggleWishlist}
        >
          <FiHeart />
        </button>

        {/* ACCOUNT */}
        <button
          type="button"
          aria-label="Account"
          className="text-2xl cursor-pointer hover:scale-110 transition"
          onClick={openAccount}
        >
          <FiUser />
        </button>

        {/* CART */}
        <button
          type="button"
          aria-label="Shopping cart"
          className="relative text-2xl cursor-pointer hover:scale-110 transition"
          onClick={toggleCart}
        >
          <FiShoppingCart />

          {mounted && totalItems > 0 && (
            <span
              className="
                absolute
                -top-2
                -right-2
                bg-black
                text-white
                text-[10px]
                rounded-full
                w-4
                h-4
                flex
                items-center
                justify-center
              "
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
