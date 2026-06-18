"use client";

import { useEffect, useRef } from "react";

/**
 * Renders the hexagon bee artwork (public/hero.png) with a gentle float and a
 * smooth, mouse-driven 3D tilt + drift. Motion is eased every animation frame
 * (lerp toward a target) so it glides instead of snapping.
 */
export default function HexBee() {
  const inner = useRef<HTMLDivElement>(null);
  const target = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const cur = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5; // -0.5 .. 0.5
      const ny = e.clientY / window.innerHeight - 0.5;
      target.current = {
        rx: ny * -38, // vertical tilt
        ry: nx * 55, // horizontal turn
        tx: nx * 90, // drift toward cursor
        ty: ny * 60,
      };
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const k = 0.09; // easing factor — lower = smoother/slower
    const tick = () => {
      const c = cur.current;
      const t = target.current;
      c.rx += (t.rx - c.rx) * k;
      c.ry += (t.ry - c.ry) * k;
      c.tx += (t.tx - c.tx) * k;
      c.ty += (t.ty - c.ty) * k;
      if (inner.current) {
        inner.current.style.transform = `translate3d(${c.tx.toFixed(
          2
        )}px, ${c.ty.toFixed(2)}px, 0) rotateX(${c.rx.toFixed(
          2
        )}deg) rotateY(${c.ry.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      style={{ perspective: "1100px" }}
    >
      <div className="animate-float" style={{ transformStyle: "preserve-3d" }}>
        <div ref={inner} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.png"
            alt="The Hive hexagon bee"
            className="h-auto w-[clamp(380px,60vw,720px)] select-none drop-shadow-[0_0_30px_rgba(255,193,7,0.4)]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
