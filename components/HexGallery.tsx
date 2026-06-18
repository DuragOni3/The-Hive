"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Full-bleed honeycomb gallery. Hexagon "windows" tile the whole section and
 * are filled with The Hive's photos (1.png-15.png in /public). Clicking a
 * hexagon opens a lightbox where the user can view the photo full-size and
 * click through all of them with the arrows (or keyboard).
 */

const HEX = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
const PHOTO_COUNT = 15;

type Cell = { x: number; y: number; w: number; h: number; photo: number };

export default function HexGallery() {
  const board = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<Cell[]>([]);
  const [idx, setIdx] = useState<number | null>(null); // lightbox photo index (0-based)

  useEffect(() => {
    const el = board.current;
    if (!el) return;

    const build = () => {
      const Wc = el.clientWidth;
      const Hc = el.clientHeight;
      if (!Wc || !Hc) return;

      const hexW = Math.max(180, Math.min(300, Wc / 5));
      const hexH = (hexW * Math.sqrt(3)) / 2;
      const colPitch = hexW * 0.75;
      const startX = -hexW * 0.5;
      const startY = -hexH;

      const numCols = Math.ceil((Wc - startX) / colPitch) + 1;
      const out: Cell[] = [];
      let i = 0;
      for (let c = 0; c < numCols; c++) {
        const x = startX + c * colPitch;
        const offY = c % 2 ? hexH / 2 : 0;
        const numRows = Math.ceil((Hc - startY - offY) / hexH) + 1;
        for (let r = 0; r < numRows; r++) {
          const y = startY + offY + r * hexH;
          out.push({ x, y, w: hexW, h: hexH, photo: (i % PHOTO_COUNT) + 1 });
          i++;
        }
      }
      setCells(out);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const close = useCallback(() => setIdx(null), []);
  const next = useCallback(
    () => setIdx((v) => (v === null ? v : (v + 1) % PHOTO_COUNT)),
    []
  );
  const prev = useCallback(
    () => setIdx((v) => (v === null ? v : (v - 1 + PHOTO_COUNT) % PHOTO_COUNT)),
    []
  );

  // keyboard controls + scroll lock while the lightbox is open
  useEffect(() => {
    if (idx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, close, next, prev]);

  return (
    <>
      <div ref={board} className="absolute inset-0">
        {cells.map((cell, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(cell.photo - 1)}
            aria-label={`View photo ${cell.photo}`}
            className="group absolute cursor-pointer transition-[filter] duration-300 [filter:drop-shadow(0_0_10px_rgba(255,193,7,0.4))] hover:z-20 hover:[filter:drop-shadow(0_0_24px_rgba(255,193,7,0.95))]"
            style={{ left: cell.x, top: cell.y, width: cell.w, height: cell.h }}
          >
            {/* yellow hexagon edge */}
            <div className="absolute inset-0 bg-honey" style={{ clipPath: HEX }} />

            {/* hexagon window filled with a photo */}
            <div
              className="absolute inset-[3px] overflow-hidden bg-ink"
              style={{ clipPath: HEX }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/${cell.photo}.png`}
                alt="The Hive"
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      {/* ---- Lightbox ---- */}
      {idx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          {/* close */}
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-honey/40 text-honey transition hover:bg-honey hover:text-ink"
          >
            <span className="relative block h-5 w-5">
              <span className="absolute left-1/2 top-1/2 block h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-1/2 top-1/2 block h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>

          {/* prev */}
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 flex h-14 w-14 items-center justify-center rounded-full border border-honey/40 text-3xl text-honey transition hover:bg-honey hover:text-ink md:left-8"
          >
            ‹
          </button>

          {/* image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/${idx + 1}.png`}
            alt={`The Hive photo ${idx + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[88vw] rounded-2xl border-2 border-honey/50 object-contain shadow-[0_0_70px_rgba(255,193,7,0.5),0_20px_55px_rgba(0,0,0,0.65)]"
          />

          {/* next */}
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 flex h-14 w-14 items-center justify-center rounded-full border border-honey/40 text-3xl text-honey transition hover:bg-honey hover:text-ink md:right-8"
          >
            ›
          </button>

          {/* counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm tracking-widest text-white/80">
            {idx + 1} / {PHOTO_COUNT}
          </div>
        </div>
      )}
    </>
  );
}
