"use client";

import Link from "next/link";
import Image from "next/image";
import { useMenu } from "./MenuContext";

const LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Events", href: "/event-planner" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/#contact" },
];

const BOOK_URL =
  "https://square.site/book/0YGF8594WM63G/the-hive-party-room-rockingham-nc";

export default function Navbar() {
  const { open, setOpen } = useMenu();

  return (
    <>
      {/* Fixed top bar: logo left, menu button right.
          pointer-events-none so the empty strip never blocks the panel below;
          interactive children re-enable pointer events. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group pointer-events-auto flex items-center gap-3 text-2xl font-bold tracking-tight md:text-3xl"
        >
          <Image
            src="/logo.png"
            alt="The Hive logo"
            width={64}
            height={64}
            priority
            className="h-14 w-14 animate-float object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)] md:h-16 md:w-16"
          />
          <span className="font-display text-white">
            The <span className="text-honey">Hive</span>
          </span>
        </Link>

        {/* Hamburger — hidden while the menu is open (the panel has its own close button) */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className={`group pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-honey/40 bg-black/40 backdrop-blur transition hover:border-honey hover:bg-honey/10 ${
            open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-[5px]">
            <span className="block h-[2px] w-6 bg-honey" />
            <span className="block h-[2px] w-6 bg-honey" />
            <span className="block h-[2px] w-6 bg-honey" />
          </div>
        </button>
      </header>

      {/* Backdrop — only dims; lets the left side (and the bee) stay visible */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[65] bg-gradient-to-r from-transparent via-ink/20 to-ink/60 transition-opacity duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Right-side slide-in panel */}
      <aside
        className={`honeycomb-bg fixed right-0 top-0 z-[70] flex h-full w-full flex-col border-l border-honey/20 bg-ink/95 backdrop-blur-xl shadow-2xl shadow-black/60 transition-transform duration-500 ease-out sm:w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-8 pt-7">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-honey">
            Menu
          </span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-honey/40 bg-black/40 transition hover:border-honey hover:bg-honey/10"
          >
            <span className="relative block h-5 w-5">
              <span className="absolute left-1/2 top-1/2 block h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-honey" />
              <span className="absolute left-1/2 top-1/2 block h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-honey" />
            </span>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
          {LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
              className={`font-display text-3xl font-extrabold uppercase tracking-tight text-white transition-all duration-500 hover:text-honey md:text-4xl ${
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-8 pb-10">
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-honey px-8 py-3.5 text-center font-display text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-gold"
          >
            Book Your Party
          </a>
        </div>
      </aside>
    </>
  );
}
