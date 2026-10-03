"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

import { useSearch } from "@/context/SearchContext";


import { luxuryPret } from "../../../data/products";
import { luxuryFormals } from "../../../data/luxuryFormals";
import { culture } from "../../../data/culture";
import { jewelry } from "../../../data/jewelry";
import { accessories } from "../../../data/accessories";

const allProducts = [...luxuryPret, ...luxuryFormals, ...culture, ...jewelry, ...accessories];

const SearchDrawer = () => {
  const { isSearchOpen, closeSearch } = useSearch();

  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  const searchResults = allProducts.filter((product) => {
    const search = query.trim().toLowerCase();

    if (!search) return false;

    return (
      product.name?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.slug?.toLowerCase().includes(search) ||
      product.barcode?.toLowerCase().includes(search)
    );
  });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[150]"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full md:w-150 bg-white z-[200] flex flex-col"
          >
            {/* HEADER */}
            <div className="pt-8 py-2 flex items-center justify-between border-b border-gray-300 px-10 shrink-0">
              <div>SEARCH</div>

              <button
                onClick={closeSearch}
                className="text-3xl cursor-pointer"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* INPUT */}
            <div className="px-10 pt-8">
              <div className="flex items-center border-b border-gray-400 pb-3">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 outline-none text-sm"
                />

                <button
                  type="button"
                  className="text-xl cursor-pointer"
                >
                  <FiSearch />
                </button>
              </div>
            </div>

            {/* RESULTS */}
            <div className="flex-1 overflow-y-auto px-10 py-8">

              {!query.trim() ? (
                <p className="text-sm text-gray-500 text-center py-10">
                  Search for products, categories or collections.
                </p>
              ) : searchResults.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-10">
                  No products found for "{query}".
                </p>
              ) : (
                <div className="flex flex-col gap-5">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={closeSearch}
                      className="flex gap-4"
                    >
                      {/* IMAGE */}
                      <div className="relative w-20 h-28 shrink-0">
                        <Image
                          src={product.img}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* DETAILS */}
                      <div className="flex flex-col justify-center">
                        <p className="text-xs text-gray-500">
                          {product.barcode}
                        </p>

                        <h3 className="text-sm mt-1">
                          {product.name}
                        </h3>

                        <p className="text-sm mt-2">
                          US ${product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

            </div>

            {/* FOOTER */}
            <div className="shrink-0 px-10 pt-4 pb-6 border-t border-gray-200">
              <button
                onClick={closeSearch}
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

export default SearchDrawer;