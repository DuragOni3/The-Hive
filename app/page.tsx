"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect } from "react";
import { useMenu } from "@/components/MenuContext";
import HexBee from "@/components/HexBee";
import HexGallery from "@/components/HexGallery";

// Three.js must only run on the client
const BeeHero = dynamic(() => import("@/components/BeeHero"), { ssr: false });

const BOOK_URL =
  "https://square.site/book/0YGF8594WM63G/the-hive-party-room-rockingham-nc";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=1210+Rockingham+Rd+Rockingham+NC";
const MAPS_EMBED =
  "https://www.google.com/maps?q=1210+Rockingham+Rd,+Rockingham,+NC&output=embed";
const FACEBOOK_URL =
  "https://www.facebook.com/search/top?q=The%20Hive%20Recreation%20Center%20Rockingham";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export default function Home() {
  useReveal();
  const { open } = useMenu();

  return (
    <main className="bg-ink text-white">
      {/* ============ HERO ============ */}
      <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden">
        {/* radial glow behind the bee */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-honey/10 blur-[120px]" />

        {/* Hexagon bee + particle cloud — shift left and fade when the menu opens */}
        <div
          className="absolute inset-0 z-10 transition-all duration-500 ease-out"
          style={{
            transform: open ? "translateX(-16vw) scale(0.9)" : "none",
            opacity: open ? 0.7 : 1,
          }}
        >
          <BeeHero />
          <HexBee />
        </div>

        {/* Overlay copy — also recedes a little when the menu opens */}
        <div
          className="pointer-events-none relative z-20 px-6 text-center transition-all duration-500"
          style={{
            transform: open ? "translateX(-16vw)" : "none",
            opacity: open ? 0.7 : 1,
          }}
        >
          {/* soft dark halo so the copy stays readable over the bee */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[155%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-ink/55 blur-2xl"
          />
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.4em] text-honey [text-shadow:0_1px_10px_rgba(0,0,0,0.95)]">
            Rockingham, NC
          </p>
          <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl lg:text-9xl">
            The <span className="text-honey">Hive</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.9)] md:text-lg">
            A private indoor party playground — plus Nectar coffee &amp; ice
            cream. Where every celebration is the bee&apos;s knees.
          </p>
          <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-honey px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink shadow-lg shadow-honey/20 transition hover:scale-105 hover:bg-gold"
            >
              Book Your Party
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/50 bg-ink/50 px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition hover:border-honey hover:bg-ink/70 hover:text-honey"
            >
              Explore
            </a>
          </div>
        </div>

      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="honeycomb-bg relative px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="reveal text-center">
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.3em] text-honey">
              About Us
            </p>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
              The sweetest spot in town
            </h2>
          </div>
          <p className="reveal mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-white/75">
            The Hive Recreation Center is a private indoor party playground built
            for unforgettable birthdays and events. Think bounce houses, a full
            playground, a dedicated toddler play area, an arcade, and basketball —
            all in one buzzing space you get all to yourself.
          </p>
          <p className="reveal mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-white/75">
            We&apos;re also home to{" "}
            <span className="font-semibold text-honey">Nectar</span>, our
            delightful coffee &amp; ice cream bar, and{" "}
            <span className="font-semibold text-honey">Blume</span>, an upscale,
            cozy room designed for grown-up gatherings. Whether you&apos;re
            celebrating something special or simply enjoying good company,
            we&apos;ll make every occasion the bee&apos;s knees.
          </p>

          <div className="reveal mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🎉",
                title: "Private Party Playground",
                text: "Bounce houses, arcade, basketball, and a toddler zone — the whole place is yours for 2 hours. Up to 50 guests.",
              },
              {
                icon: "☕",
                title: "Nectar Coffee & Ice Cream",
                text: "Our in-house coffee and ice cream bar, open whenever The Hive is buzzing.",
              },
              {
                icon: "🥂",
                title: "Blume — Adult Events",
                text: "A cozy, upscale room seating up to 48. Perfect for showers, office parties, and milestone celebrations.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="group rounded-3xl border border-honey/15 bg-charcoal/60 p-8 transition hover:-translate-y-1 hover:border-honey/50"
              >
                <div className="mb-4 text-4xl transition-transform group-hover:scale-110">
                  {c.icon}
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-white">
                  {c.title}
                </h3>
                <p className="text-white/65">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section
        id="gallery"
        className="relative h-[90vh] min-h-[600px] w-full overflow-hidden"
      >
        {/* full-bleed honeycomb fills the section */}
        <HexGallery />

        {/* title dead-center over the hexagons */}
        <div className="reveal pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <div className="rounded-3xl bg-ink/55 px-10 py-8 backdrop-blur-sm">
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.3em] text-honey">
              Gallery
            </p>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
              Buzzin&apos; around The Hive
            </h2>
          </div>
        </div>
      </section>

      {/* ============ CONTACT / HOURS ============ */}
      <section id="contact" className="honeycomb-bg relative px-6 py-28 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.3em] text-honey">
              Visit &amp; Contact
            </p>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
              Come find the buzz
            </h2>

            <div className="mt-8 space-y-5 text-lg text-white/80">
              <p className="flex items-start gap-3">
                <span className="text-honey">📍</span>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-honey"
                >
                  1210 Rockingham Rd, Rockingham, NC
                  <span className="block text-sm text-white/50">
                    (Behind Domino&apos;s)
                  </span>
                </a>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-honey">📞</span>
                <a href="tel:+19104348107" className="hover:text-honey">
                  (910) 434-8107
                </a>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-honey">🕒</span>
                <span>
                  Open play hours vary — check our Facebook for the latest.
                  Nectar is open whenever The Hive is open.
                </span>
              </p>
            </div>

            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-honey px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink transition hover:scale-105 hover:bg-gold"
            >
              Book Your Party
            </a>
          </div>

          <div className="reveal overflow-hidden rounded-3xl border border-honey/20 shadow-2xl shadow-black/50">
            <iframe
              title="The Hive location map"
              src={MAPS_EMBED}
              width="100%"
              height="380"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.2]"
            />
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-honey/15 bg-black px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3 font-display text-xl font-bold">
            <Image
              src="/logo.png"
              alt="The Hive logo"
              width={56}
              height={56}
              className="h-12 w-12 object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)]"
            />
            The <span className="text-honey">Hive</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Hive on Facebook"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-honey/40 text-honey transition hover:scale-110 hover:bg-honey hover:text-ink"
            >
              <FacebookIcon />
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 transition hover:text-honey"
            >
              1210 Rockingham Rd, Rockingham, NC →
            </a>
          </div>

          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} The Hive Recreation Center LLC
          </p>
        </div>
      </footer>
    </main>
  );
}
