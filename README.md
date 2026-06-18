# 🐝 The Hive — Website

A modern, bee-themed website for **The Hive Recreation Center LLC** in Rockingham, NC.
Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, featuring an
interactive 3D bee hero (Three.js) that follows your mouse, surrounded by
glowing yellow particles.

## ✨ Features

- **Interactive 3D bee hero** — a procedural black & yellow bee built with
  `@react-three/fiber` that tilts toward your cursor, with flapping wings,
  a hovering bob, and a swirling cloud of yellow "pollen" particles.
- **Right-side slide-in menu** — a single button (top-right) opens a side panel
  with its own close (✕) button. While open, the homepage bee slides left and
  fades slightly so the menu stays clear. Links: About Us, Rooms, Event Planner,
  Gallery, Menu, Contact.
- **Homepage sections** — Hero, About Us, Gallery, and Contact/Hours with an
  embedded Google Map and a "Book Your Party" call-to-action.
- **Footer** — Facebook icon + address linked to Google Maps.
- **Coming Soon pages** for the secondary nav links.
- Real business details pulled from the current site (address, phone, booking link).

## 🚀 Getting started (in VS Code)

1. Open this folder in VS Code.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open <http://localhost:3000> in your browser.

To build for production: `npm run build` then `npm run start`.

## 🎨 Customizing

- **Colors / theme:** edit `tailwind.config.ts` (`honey`, `amber`, `gold`, `ink`).
- **The bee:** tweak shapes, colors, and animation in `components/Bee.tsx`.
- **Particles:** adjust count, size, and drift in `components/Particles.tsx`.
- **Gallery photos:** drop images in `/public` and replace the placeholder tiles
  in `app/page.tsx` (the Gallery section) with `next/image`.
- **Nav links:** edit the `LINKS` array in `components/Navbar.tsx`.
- **Map / address:** the `MAPS_URL`, `MAPS_EMBED`, and contact info live at the
  top of `app/page.tsx`.

## 📁 Structure

```
app/
  layout.tsx        Root layout (fonts, navbar)
  page.tsx          Homepage (hero + about + gallery + contact + footer)
  globals.css       Tailwind + theme styles
  rooms|event-planner|menu|about|gallery|contact/   Coming Soon pages
components/
  Navbar.tsx        Hidden overlay menu + hamburger button
  BeeHero.tsx       Three.js canvas + lights
  Bee.tsx           Procedural 3D bee
  Particles.tsx     Yellow particle cloud
  ComingSoon.tsx    Reusable placeholder page
```

Business: The Hive Recreation Center LLC · 1210 Rockingham Rd, Rockingham, NC · (910) 434-8107
"# The-Hive" 
