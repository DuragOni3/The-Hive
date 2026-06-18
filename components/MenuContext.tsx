"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type MenuCtx = { open: boolean; setOpen: (v: boolean) => void };

const Ctx = createContext<MenuCtx>({ open: false, setOpen: () => {} });

export function useMenu() {
  return useContext(Ctx);
}

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  // Lock page scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}
