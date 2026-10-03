"use client";

import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const AuthInitializer = () => {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return null; // ye kuch render nahi karta, bas side-effect hai
};

export default AuthInitializer;