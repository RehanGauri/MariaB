"use client";

import Link from "next/link";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useCartStore } from "../../../store/useCartStore";
import CartItem from "@/components/cart/CartPageItem";
import PreviousItem from "@/components/ui/PreviousItem";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

const CartPage = () => {
  const items = useCartStore(
    (state) => state.items
  );

  const previousOrders = useCartStore(
    (state) => state.previousOrders
  );

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const clearHistory = useCartStore(
    (state) => state.clearHistory
  );

  const totalPrice = useCartStore(
    (state) => state.getTotalPrice()
  );
  const placeOrder = useCartStore(
    (state) => state.placeOrder
  );

  const handleClearHistory = () => {
    clearHistory();

    toast.success("Order history cleared", {
      duration: 2500,
    });
  };


  const handleCheckout = () => {
  if (items.length === 0) {
    toast.error("Please add some products to cart first!");
    return;
  }
    const success = placeOrder();

    placeOrder()
    toast.success(
      "Your order was placed successfully! Thanks for shopping with us!"
    );

};



  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Page Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              text-gray-500
              hover:text-black
              transition
              mb-5
            "
          >
            <FaArrowLeft />
            Continue Shopping
          </Link>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            My Cart
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage your current items and view
            your previous orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">

          {/* LEFT */}
          <div>

            {/* CURRENT CART */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold">
                  Current Cart
                </h2>

                <span className="text-xs text-gray-500">
                  {items.length}{" "}
                  {items.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              {items.length === 0 ? (
                <div
                  className="
                    border
                    border-dashed
                    border-zinc-300
                    rounded-2xl
                    py-16
                    px-5
                    text-center
                  "
                >
                  <FiShoppingBag className="text-4xl mx-auto text-gray-400" />

                  <h3 className="text-lg font-semibold mt-4">
                    Your cart is empty
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    You haven&apos;t added any products yet.
                  </p>

                  <Link
                    href="/"
                    className="
                      inline-flex
                      mt-6
                      bg-black
                      text-white
                      px-6
                      py-3
                      rounded-lg
                      text-sm
                      font-medium
                    "
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="border border-zinc-200 rounded-2xl overflow-hidden">
                  <div className="divide-y divide-zinc-200 px-4 sm:px-6">
                    {items.map((item) => (
                      <CartItem
                        key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                        item={item}
                        updateQuantity={updateQuantity}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* ORDER HISTORY */}
            <section className="mt-14">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order History
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Your previously placed orders.
                  </p>
                </div>

                {previousOrders.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-red-500
                      hover:text-red-700
                      cursor-pointer
                    "
                  >
                    <FaTrash />
                    Clear History
                  </button>
                )}
              </div>

              {previousOrders.length === 0 ? (
                <div
                  className="
                    border
                    border-dashed
                    border-zinc-300
                    rounded-2xl
                    py-14
                    text-center
                  "
                >
                  <p className="text-sm text-gray-500">
                    No previous orders yet.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {previousOrders.map((order) => (
                    <PreviousItem
                      key={order.id}
                      order={order}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT — SUMMARY */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="
                border
                border-zinc-200
                rounded-2xl
                p-5
                sm:p-6
              "
            >
              <h2 className="font-semibold">
                Cart Summary
              </h2>

              <div className="flex justify-between mt-6 text-sm">
                <span className="text-gray-500">
                  Items
                </span>

                <span>
                  {items.reduce(
                    (sum, item) =>
                      sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between mt-3 text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  US ${totalPrice}
                </span>
              </div>

              <div className="border-t border-zinc-200 my-5" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>

                <span>
                  US ${totalPrice}
                </span>
              </div>

              <Button
                text="CHECKOUT"
                onClick={handleCheckout}
                classNames="
                  w-full
                  justify-center
                  py-3
                  mt-6
                "
              />

              <p className="text-[11px] text-gray-400 text-center mt-3">
                Taxes and shipping calculated at
                checkout.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;