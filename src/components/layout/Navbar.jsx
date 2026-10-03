"use client";

import React, { useState, useEffect } from "react";

import { useCart } from "@/context/CartContext";
import { useCartStore } from "../../../store/useCartStore";
import { FiHeart, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { useWishlist } from "@/context/WishlistContext";
import { useAccount } from "@/context/AccountContext";
import Link from "next/link";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const { toggleWishlist } = useWishlist();
  const { toggleCart } = useCart();
  const { openAccount } = useAccount();

  return (
    <div className="bg-white sticky top-0 left-0 flex justify-between p-6 px-3 sm:px-6 z-50">
      <div className="flex gap-2 sm:gap-6">
        <button className="text-2xl cursor-pointer hover:scale-110 transition">
          <RiMenu2Fill />
        </button>
        <button className="text-2xl cursor-pointer hover:scale-110 transition">
          <FiSearch />
        </button>
      </div>
      <Link href={"/"}>
        <h1 className="text-2xl">MARIA.B.</h1>
      </Link>
      <div className="flex gap-2 sm:gap-6">
        <button
          className="text-2xl cursor-pointer hover:scale-110 transition"
          onClick={toggleWishlist}
        >
          <FiHeart />
        </button>
        <button
          className="text-2xl cursor-pointer hover:scale-110 transition"
          onClick={openAccount}
        >
          <FiUser />
        </button>
        <button
          className="relative text-2xl cursor-pointer hover:scale-110 transition"
          onClick={toggleCart}
        >
          <FiShoppingCart />
          {mounted && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;