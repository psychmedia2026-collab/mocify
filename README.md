# MOCIFY

MOCIFY is a Next.js frontend prototype for an AI-music discovery and artist platform. The current phase focuses on listening, discovery, artists, uploads and premium presentation. Backend accounts, storage, playback and payments are intentionally not connected yet.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

The production build currently uses `next build --webpack`. Development keeps the normal `next dev` workflow. Webpack is explicit for production because Turbopack encountered blocked internal process communication in the older local Mac environment used for this prototype; it is not a product requirement and can be revisited when the development environment changes.

## Current prototype routes

- `/` — homepage
- `/explore` — discovery
- `/artists` — artist catalog
- `/artist/andigo` — first artist profile
- `/track/toca-bonbon` — first track detail page
- `/library` — prototype library
- `/upload` — upload prototype
- `/login` and `/signup` — account prototypes
- `/plans` — subscription plans (`/premium` redirects here)
- `/settings` — prototype settings

## Visual direction

The interface follows MOCIFY's black neon visual system with violet, pink, cyan and orange accents. The approved hero and bird logo live in `public/mocify-hero.webp` and `public/mocify-logo.webp`.
