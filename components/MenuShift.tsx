"use client";

import type { ReactNode } from "react";
import { useMenu } from "./MenuContext";

/**
 * Shifts the entire page content to the left when the menu opens, so every
 * section slides over together to make room for the side menu.
 */
export default function MenuShift({ children }: { children: ReactNode }) {
  const { open } = useMenu();
  return (
    <div
      className="transition-transform duration-500 ease-out"
      style={{ transform: open ? "translateX(-16vw)" : "none" }}
    >
      {children}
    </div>
  );
}
