"use client";

import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const openAccount = () => setIsAccountOpen(true);
  const closeAccount = () => setIsAccountOpen(false);
  const toggleAccount = () => setIsAccountOpen((prev) => !prev);

  return (
    <AccountContext.Provider
      value={{ isAccountOpen, openAccount, closeAccount, toggleAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);