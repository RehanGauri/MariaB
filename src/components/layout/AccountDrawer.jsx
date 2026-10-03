"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { useAccount } from "@/context/AccountContext";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from "react-hot-toast";
import { useWishlist } from "@/context/WishlistContext";


const AccountDrawer = () => {
  
  const { openWishlist } = useWishlist();

  const { isAccountOpen, closeAccount } = useAccount();
  const [mode, setMode] = useState("login"); // "login" | "signup"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const user = useAuthStore((state) => state.user);
  const signUp = useAuthStore((state) => state.signUp);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);

  useEffect(() => {
    document.body.style.overflow = isAccountOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAccountOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signup") {
        await signUp(email, password, fullName);
        toast.success("Account created! Check your email to verify.");
      } else {
        await signIn(email, password);
        toast.success("Logged in successfully");
      }
      closeAccount();
      setEmail("");
      setPassword("");
      setFullName("");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out");
    closeAccount();
  };


  const handleWishlistClick = () => {
    closeAccount();
    openWishlist();
  };


  return (
    <AnimatePresence>
      {isAccountOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeAccount}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[150]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed flex flex-col top-0 right-0 h-full bg-white w-full md:w-125 z-[200] py-5"
          >
            {/* Header */}
            <div className="pt-8 py-2 flex justify-between items-center border-b border-gray-300 px-10 shrink-0">
              <div className="flex items-center gap-2">
                <FiUser className="text-lg" />
                <span>
                  {user ? "MY ACCOUNT" : mode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
                </span>
              </div>
              <button className="text-3xl cursor-pointer" onClick={closeAccount}>
                <IoCloseOutline />
              </button>
            </div>

            {/* LOGGED IN VIEW */}
            {user ? (
              <div className="flex-1 overflow-y-auto px-10 py-8">
                <div className="flex items-center gap-4 pb-6 border-b border-zinc-200">
                  <div className="h-14 w-14 rounded-full bg-zinc-200 flex items-center justify-center">
                    <FiUser className="text-2xl text-zinc-500" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {user.user_metadata?.full_name || "Welcome back"}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-col mt-6 *:text-left *:py-3 *:border-b *:border-zinc-100 *:text-sm">
                  <button className="cursor-pointer hover:text-gray-500 transition">
                    My Orders
                  </button>
                  <button
                  onClick={handleWishlistClick}
                  className="cursor-pointer hover:text-gray-500 transition">
                    My Wishlist
                  </button>
                  <button className="cursor-pointer hover:text-gray-500 transition">
                    Account Details
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-8 w-full text-sm underline text-center py-2 cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              /* LOGIN / SIGNUP FORM */
              <div className="flex-1 overflow-y-auto px-10 py-8">
                <p className="text-sm text-gray-500 mb-6">
                  {mode === "login"
                    ? "Welcome back — log in to view your orders and wishlist."
                    : "Create an account to track orders and save your favorites."}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {mode === "signup" && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name"
                        className="border border-zinc-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black transition"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="border border-zinc-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="border border-zinc-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black transition"
                    />
                  </div>

                  {mode === "login" && (
                    <button
                      type="button"
                      className="text-xs underline text-gray-500 w-fit"
                    >
                      Forgot your password?
                    </button>
                  )}

                  <Button
                    text={
                      submitting
                        ? "PLEASE WAIT..."
                        : mode === "login"
                        ? "LOG IN"
                        : "CREATE ACCOUNT"
                    }
                    classNames="justify-center w-full py-3 bg-black text-white mt-2"
                    styles={submitting ? { pointerEvents: "none", opacity: 0.6 } : {}}
                  />
                </form>

                <div className="mt-6 pt-6 border-t border-zinc-200 text-sm text-center text-gray-500">
                  {mode === "login" ? (
                    <>
                      New here?{" "}
                      <button
                        onClick={() => setMode("signup")}
                        className="text-black underline cursor-pointer"
                      >
                        Create an account
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => setMode("login")}
                        className="text-black underline cursor-pointer"
                      >
                        Log in
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountDrawer;