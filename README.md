# The Sound of Contamination

A headphone chemical safety dashboard that lets consumers look up risk ratings for popular headphone models. Based on the [2026 Arnika report](https://arnika.org/en) on endocrine disruptors and hazardous additives found in headphones sold across Central Europe.

## What It Does

Search for a headphone model to see its chemical risk profile — including ratings for skin-contact parts, internal components, and an overall safety score (green / yellow / red). Each result includes contextual advice and links to manufacturer support pages.

## Tech Stack

- **[SolidJS](https://www.solidjs.com/)** — reactive UI framework
- **[Tailwind CSS v4](https://tailwindcss.com/)** — utility-first styling
- **[Vite](https://vite.dev/)** — dev server & build tool
- **TypeScript**

## Architecture

```
index.html
 └─ main.tsx                  ← SolidJS entry point
     └─ App.tsx               ← Single-page app
         ├─ data.ts           ← Static dataset (HeadphoneData[])
         ├─ index.css          ← Tailwind styles
         │
         ├─ Search + Suggestions
         │   └─ filters data.ts by query, renders dropdown
         │
         └─ Detail View (selected model)
             ├─ RatingBadge    ← Skin / Non-skin ratings
             ├─ Chemical Risk Profile
             └─ Action Advice + Support Link
```

All data is bundled client-side — no backend or API calls required.

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:8000`.

## Data Source

[A Comprehensive Analysis of Endocrine Disruptors and Hazardous Additives in Headphones](https://tudatosvasarlo.hu/tox-free-life-for-all-english) — published by [Arnika](https://arnika.org/en) and [Tudatos Vásárlók](https://tudatosvasarlo.hu) as part of the ToxFree LIFE for All project.
